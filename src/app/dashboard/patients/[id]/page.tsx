import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./therapeutic_sheet.module.css";
import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default async function PatientDetailPage({ params }: { params: { id: string } }) {
    const patient = await prisma.patient.findUnique({
        where: { id: params.id },
        include: {
            prescriptions: {
                where: { active: true },
                include: { medication: true },
                orderBy: { medication: { name: 'asc' } },
            },
        },
    });

    if (!patient) notFound();

    const scheduleLabels = ['Jejum', 'P. Alm.', 'Almoço', 'Lanche', 'Jantar', 'Deitar'];

    return (
        <div>
            <div className="mb-4">
                <Link href="/dashboard/patients" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600">
                    <ArrowLeftIcon style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                    Voltar a Doentes
                </Link>
            </div>

            <header className={styles.patientHeader}>
                <div>
                    <h1 className={styles.name}>{patient.name}</h1>
                    <div className={styles.meta}>
                        <span>Quarto: <strong>{patient.room || 'N/A'}</strong></span>
                        <span>Admissão: <strong>{new Date(patient.admissionDate).toLocaleDateString('pt-PT')}</strong></span>
                        <span>Estado: <strong style={{ color: patient.status === 'ACTIVE' ? '#16a34a' : '#64748b' }}>{patient.status}</strong></span>
                    </div>
                </div>
            </header>

            <section>
                <div className={styles.sectionTitle}>
                    <h2>Ficha Terapêutica Ativa</h2>
                    <Link href={`/dashboard/patients/${patient.id}/prescribe`} className={styles.addBtn}>
                        <PlusIcon style={{ width: '16px', height: '16px', marginRight: '4px', display: 'inline' }} />
                        Prescrever
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className={styles.prescriptionTable}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Medicamento</th>
                                <th className={styles.th}>Dosagem</th>
                                {scheduleLabels.map(label => (
                                    <th key={label} className={`${styles.th} ${styles.scheduleCell}`}>{label}</th>
                                ))}
                                <th className={styles.th}>Instruções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patient.prescriptions.length === 0 ? (
                                <tr>
                                    <td colSpan={scheduleLabels.length + 3} className={styles.td} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                                        Nenhuma medicação ativa prescrita.
                                    </td>
                                </tr>
                            ) : (
                                patient.prescriptions.map(p => (
                                    <tr key={p.id}>
                                        <td className={styles.td}><strong>{p.medication.name}</strong></td>
                                        <td className={styles.td}>{p.medication.dosage}</td>
                                        <td className={`${styles.td} ${styles.scheduleCell}`}>
                                            {p.jejum ? <div className={styles.activeDot} /> : <div className={styles.inactiveDot} />}
                                        </td>
                                        <td className={`${styles.td} ${styles.scheduleCell}`}>
                                            {p.pequenoAlmoco ? <div className={styles.activeDot} /> : <div className={styles.inactiveDot} />}
                                        </td>
                                        <td className={`${styles.td} ${styles.scheduleCell}`}>
                                            {p.almoco ? <div className={styles.activeDot} /> : <div className={styles.inactiveDot} />}
                                        </td>
                                        <td className={`${styles.td} ${styles.scheduleCell}`}>
                                            {p.lanche ? <div className={styles.activeDot} /> : <div className={styles.inactiveDot} />}
                                        </td>
                                        <td className={`${styles.td} ${styles.scheduleCell}`}>
                                            {p.jantar ? <div className={styles.activeDot} /> : <div className={styles.inactiveDot} />}
                                        </td>
                                        <td className={`${styles.td} ${styles.scheduleCell}`}>
                                            {p.deitar ? <div className={styles.activeDot} /> : <div className={styles.inactiveDot} />}
                                        </td>
                                        <td className={styles.td}>{p.instructions || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
