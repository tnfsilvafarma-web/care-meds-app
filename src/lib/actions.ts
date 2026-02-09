"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";

export type ActionState = {
    error?: string;
    success?: boolean;
    id?: string;
};

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}

export async function createPatient(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const name = formData.get("name") as string;
    const room = formData.get("room") as string;
    const session = await auth();
    const locationId = (session?.user as any)?.locationId;

    if (!name) return { error: "Nome é obrigatório.", success: false };

    try {
        const patient = await prisma.patient.create({
            data: {
                name,
                room,
                locationId: locationId || undefined // Allow global if no location
            },
        });
        return { success: true, id: patient.id };
    } catch (error) {
        return { error: "Falha ao criar doente.", success: false };
    }
}

export async function createMedication(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const name = formData.get("name") as string;
    const dosage = formData.get("dosage") as string;
    const activeGroup = (formData.get("activeGroup") as string) || "Geral";

    if (!name || !dosage) return { error: "Nome e dosagem são obrigatórios.", success: false };

    try {
        const med = await prisma.medication.create({
            data: { name, dosage, activeGroup },
        });
        return { success: true, id: med.id };
    } catch (error) {
        return { error: "Falha ao criar medicamento.", success: false };
    }
}

export async function createPrescription(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const patientId = formData.get("patientId") as string;
    const medicationId = formData.get("medicationId") as string;
    const instructions = formData.get("instructions") as string;

    const jejum = formData.get("jejum") === "on";
    const pequenoAlmoco = formData.get("pequenoAlmoco") === "on";
    const almoco = formData.get("almoco") === "on";
    const lanche = formData.get("lanche") === "on";
    const jantar = formData.get("jantar") === "on";
    const deitar = formData.get("deitar") === "on";

    const userId = "cls_admin_001"; // Hardcoded for now, should come from session

    if (!patientId || !medicationId) return { error: "Doente e medicamento são obrigatórios.", success: false };

    try {
        const prescription = await prisma.prescription.create({
            data: {
                patientId,
                medicationId,
                instructions,
                jejum,
                pequenoAlmoco,
                almoco,
                lanche,
                jantar,
                deitar,
                prescribedById: userId,
            },
        });

        await prisma.auditLog.create({
            data: {
                entityType: "PRESCRIPTION",
                entityId: prescription.id,
                action: "CREATE",
                changedById: userId,
                details: `Prescrição criada para o doente ${patientId}`,
            }
        });

        return { success: true, id: prescription.id };
    } catch (error) {
        console.error(error);
        return { error: "Falha ao criar prescrição.", success: false };
    }
}

export async function recordAdministration(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const prescriptionId = formData.get("prescriptionId") as string;
    const timeSlot = formData.get("timeSlot") as string; // JEJUM, PA, ALMOCO, LANCHE, JANTAR, DEITAR
    const status = (formData.get("status") as any) || "TAKEN";
    const note = formData.get("note") as string;
    const administeredById = "cls_admin_001"; // Placeholder

    if (!prescriptionId || !timeSlot) return { error: "Prescrição e horário são obrigatórios.", success: false };

    try {
        const admin = await prisma.administration.create({
            data: {
                prescriptionId,
                timeSlot,
                status,
                note,
                administeredById,
                date: new Date(),
            },
        });

        await prisma.auditLog.create({
            data: {
                entityType: "ADMINISTRATION",
                entityId: admin.id,
                action: "CREATE",
                changedById: administeredById,
                details: `Administração registada (${timeSlot}) com estado ${status}`,
            }
        });

        return { success: true, id: admin.id };
    } catch (error) {
        console.error(error);
        return { error: "Falha ao registar administração.", success: false };
    }
}

export async function deactivatePrescription(id: string) {
    const userId = "cls_admin_001"; // Placeholder

    try {
        const prescription = await prisma.prescription.update({
            where: { id },
            data: { active: false },
        });

        await prisma.auditLog.create({
            data: {
                entityType: "PRESCRIPTION",
                entityId: id,
                action: "UPDATE",
                changedById: userId,
                details: `Prescrição desativada`,
            }
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Falha ao desativar prescrição.", success: false };
    }
}
