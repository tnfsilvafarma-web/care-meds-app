"use client";

import { useActionState } from "react";
import { recordAdministration, type ActionState } from "@/lib/actions";
import styles from "./records.module.css";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function AdminRecordItem({
    prescription,
    timeSlot,
    timeSlotLabel,
    isDone,
    adminData
}: {
    prescription: any;
    timeSlot: string;
    timeSlotLabel: string;
    isDone: boolean;
    adminData?: any;
}) {
    const initialState: ActionState = { success: false, error: undefined };
    const [state, dispatch, isPending] = useActionState(recordAdministration, initialState);

    if (isDone || state.success) {
        const status = state.success ? "TAKEN" : adminData?.status;
        return (
            <div className={styles.recordCard}>
                <div className={styles.patientInfo}>
                    <p className={styles.medName}>
                        {prescription.patient.name} - {prescription.medication.name}
                        <span className={styles.timeSlot}>{timeSlotLabel}</span>
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Estado: {status}</p>
                </div>
                <div className={styles.completedBadge}>
                    <CheckIcon style={{ width: '20px', height: '20px', marginRight: '4px' }} />
                    Registado
                </div>
            </div>
        );
    }

    return (
        <div className={styles.recordCard}>
            <div className={styles.patientInfo}>
                <p className={styles.medName}>
                    {prescription.patient.name} - {prescription.medication.name}
                    <span className={styles.timeSlot}>{timeSlotLabel}</span>
                </p>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{prescription.medication.dosage}</p>
            </div>

            <div className={styles.actions}>
                <form action={dispatch}>
                    <input type="hidden" name="prescriptionId" value={prescription.id} />
                    <input type="hidden" name="timeSlot" value={timeSlot} />
                    <input type="hidden" name="status" value="TAKEN" />
                    <button type="submit" disabled={isPending} className={styles.btnTaken}>
                        Tomou
                    </button>
                </form>
                <form action={dispatch}>
                    <input type="hidden" name="prescriptionId" value={prescription.id} />
                    <input type="hidden" name="timeSlot" value={timeSlot} />
                    <input type="hidden" name="status" value="REFUSED" />
                    <button type="submit" disabled={isPending} className={styles.btnRefused}>
                        Recusou
                    </button>
                </form>
            </div>
        </div>
    );
}
