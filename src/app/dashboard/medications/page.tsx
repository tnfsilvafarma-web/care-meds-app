import { prisma } from "@/lib/prisma";
import { BeakerIcon, PlusIcon } from "@heroicons/react/24/outline";
import styles from "./medications.module.css";
import Link from "next/link";

export default async function MedicationsPage() {
    const medications = await prisma.medication.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <h1 className={styles.title}>Banco de Medicamentos</h1>
                <Link href="/dashboard/medications/new" className={styles.addBtn}>
                    <PlusIcon style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    Novo Medicamento
                </Link>
            </div>

            {medications.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                    <BeakerIcon style={{ width: '48px', height: '48px', margin: '0 auto', color: '#cbd5e1' }} />
                    <p className="mt-4 text-slate-500">Nenhum medicamento registado.</p>
                </div>
            ) : (
                <div className={styles.medsGrid}>
                    {medications.map((med) => (
                        <div key={med.id} className={styles.medCard}>
                            <h3 className={styles.medName}>{med.name}</h3>
                            <p className={styles.medDosage}>{med.dosage}</p>
                            <span className={styles.tag}>{med.activeGroup}</span>
                            <div className={styles.actions}>
                                <button className={styles.editBtn}>Editar</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
