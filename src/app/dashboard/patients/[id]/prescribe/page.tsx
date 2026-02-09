import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PrescribeForm from "./prescribe-form";

export default async function PrescribePage({ params }: { params: { id: string } }) {
    const patient = await prisma.patient.findUnique({
        where: { id: params.id }
    });

    if (!patient) notFound();

    const medications = await prisma.medication.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeights: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                Nova Prescrição
            </h1>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                A prescrever para: <strong>{patient.name}</strong>
            </p>

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
                <PrescribeForm patientId={patient.id} medications={medications} />
            </div>
        </div>
    );
}
