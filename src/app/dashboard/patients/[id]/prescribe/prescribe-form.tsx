"use client";

import { useActionState } from "react";
import { createPrescription, type ActionState } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "@/app/login/login.module.css";
import { Medication } from "@prisma/client";

export default function PrescribeForm({
    patientId,
    medications
}: {
    patientId: string;
    medications: Medication[]
}) {
    const router = useRouter();
    const initialState: ActionState = { error: undefined, success: false };
    const [state, dispatch, isPending] = useActionState(createPrescription, initialState);

    useEffect(() => {
        if (state.success) {
            router.push(`/dashboard/patients/${patientId}`);
            router.refresh();
        }
    }, [state, router, patientId]);

    return (
        <form action={dispatch} className="space-y-6">
            <input type="hidden" name="patientId" value={patientId} />

            <div className={styles.formGroup}>
                <label htmlFor="medicationId" className={styles.label}>Medicamento</label>
                <select name="medicationId" id="medicationId" required className={styles.input}>
                    <option value="">Selecione um medicamento...</option>
                    {medications.map(m => (
                        <option key={m.id} value={m.id}>{m.name} ({m.dosage})</option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Horário de Administração</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#1e293b' }}>
                        <input type="checkbox" name="jejum" /> <span style={{ fontSize: '0.875rem' }}>Jejum</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#1e293b' }}>
                        <input type="checkbox" name="pequenoAlmoco" /> <span style={{ fontSize: '0.875rem' }}>Pequeno Almoço</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#1e293b' }}>
                        <input type="checkbox" name="almoco" /> <span style={{ fontSize: '0.875rem' }}>Almoço</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#1e293b' }}>
                        <input type="checkbox" name="lanche" /> <span style={{ fontSize: '0.875rem' }}>Lanche</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#1e293b' }}>
                        <input type="checkbox" name="jantar" /> <span style={{ fontSize: '0.875rem' }}>Jantar</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#1e293b' }}>
                        <input type="checkbox" name="deitar" /> <span style={{ fontSize: '0.875rem' }}>Deitar</span>
                    </label>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="instructions" className={styles.label}>Instruções / Notas</label>
                <textarea
                    name="instructions"
                    id="instructions"
                    placeholder="Ex: Dissolver em água..."
                    className={styles.input}
                    style={{ minHeight: '80px', width: '100%' }}
                />
            </div>

            {state.error && <p className={styles.error}>{state.error}</p>}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" disabled={isPending} className={styles.button}>
                    {isPending ? "A guardar..." : "Confirmar Prescrição"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className={styles.button}
                    style={{ backgroundColor: '#64748b' }}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
