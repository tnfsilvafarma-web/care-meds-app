"use client";

import { useActionState } from "react";
import { createPatient, type ActionState } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "@/app/login/login.module.css"; // Reuse basic form group styles

export default function CreatePatientForm() {
    const router = useRouter();
    const initialState: ActionState = { error: undefined, success: false };
    const [state, dispatch, isPending] = useActionState(createPatient, initialState);

    useEffect(() => {
        if (state.success) {
            router.push("/dashboard/patients");
            router.refresh();
        }
    }, [state, router]);

    return (
        <form action={dispatch}>
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Nome Completo</label>
                <input name="name" id="name" type="text" required className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="room" className={styles.label}>Quarto</label>
                <input name="room" id="room" type="text" className={styles.input} />
            </div>

            {state.error && <p className={styles.error}>{state.error}</p>}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" disabled={isPending} className={styles.button}>
                    {isPending ? "A guardar..." : "Guardar Doente"}
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
