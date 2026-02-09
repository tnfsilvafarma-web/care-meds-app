"use client";

import { useActionState } from "react";
import { createMedication, type ActionState } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "@/app/login/login.module.css";

export default function CreateMedicationForm() {
    const router = useRouter();
    const initialState: ActionState = { error: undefined, success: false };
    const [state, dispatch, isPending] = useActionState(createMedication, initialState);

    useEffect(() => {
        if (state.success) {
            router.push("/dashboard/medications");
            router.refresh();
        }
    }, [state, router]);

    return (
        <form action={dispatch}>
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Nome do Medicamento</label>
                <input name="name" id="name" type="text" placeholder="Ex: Paracetamol" required className={styles.input} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="dosage" className={styles.label}>Dosagem / Apresentação</label>
                <input name="dosage" id="dosage" type="text" placeholder="Ex: 500mg, 10ml, etc." required className={styles.input} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="activeGroup" className={styles.label}>Grupo Ativo (Opcional)</label>
                <input name="activeGroup" id="activeGroup" type="text" placeholder="Ex: Geral, Antibióticos" className={styles.input} />
            </div>

            {state.error && <p className={styles.error}>{state.error}</p>}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" disabled={isPending} className={styles.button} style={{ backgroundColor: '#0d9488' }}>
                    {isPending ? "A guardar..." : "Guardar Medicamento"}
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
