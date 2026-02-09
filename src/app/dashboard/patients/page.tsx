import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PlusIcon } from "@heroicons/react/24/outline";
import styles from "./patients.module.css";

export default async function PatientsPage() {
    const patients = await prisma.patient.findMany({
        orderBy: { name: 'asc' },
    });

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Doentes</h1>
                <Link
                    href="/dashboard/patients/new"
                    className={styles.addBtn}
                >
                    <PlusIcon style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    Novo Doente
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.th}>Nome</th>
                            <th className={styles.th}>Quarto</th>
                            <th className={styles.th}>Admissão</th>
                            <th className={styles.th}>Estado</th>
                            <th className={styles.th}>
                                <span className="sr-only">Ações</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {patients.length === 0 ? (
                            <tr>
                                <td colSpan={5} className={styles.emptyState}>
                                    Nenhum doente encontrado.
                                </td>
                            </tr>
                        ) : (
                            patients.map((patient) => (
                                <tr key={patient.id} className={styles.tr}>
                                    <td className={styles.td}>{patient.name}</td>
                                    <td className={styles.td}>{patient.room || '-'}</td>
                                    <td className={styles.td}>
                                        {new Date(patient.admissionDate).toLocaleDateString('pt-PT')}
                                    </td>
                                    <td className={styles.td}>
                                        <span className={`${styles.statusBadge} ${patient.status === 'ACTIVE' ? styles.statusActive : styles.statusInactive
                                            }`}>
                                            {patient.status}
                                        </span>
                                    </td>
                                    <td className={`${styles.td} text-right`}>
                                        <Link href={`/dashboard/patients/${patient.id}`} className={styles.viewLink}>
                                            Ver Ficha
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
