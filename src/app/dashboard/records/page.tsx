import { prisma } from "@/lib/prisma";
import AdminRecordItem from "./AdminRecordItem";
import styles from "./records.module.css";

export default async function RecordsPage() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch all active prescriptions and their administrations for today
    const prescriptions = await prisma.prescription.findMany({
        where: { active: true },
        include: {
            patient: true,
            medication: true,
            administrations: {
                where: {
                    date: {
                        gte: today,
                    }
                }
            }
        }
    });

    const slots = [
        { key: 'jejum', label: 'Jejum' },
        { key: 'pequenoAlmoco', label: 'Peq. Almoço' },
        { key: 'almoco', label: 'Almoço' },
        { key: 'lanche', label: 'Lanche' },
        { key: 'jantar', label: 'Jantar' },
        { key: 'deitar', label: 'Deitar' },
    ];

    // Flatten prescriptions into scheduled tasks
    const tasks: any[] = [];
    prescriptions.forEach(p => {
        slots.forEach(slot => {
            if (p[slot.key as keyof typeof p]) {
                const adminForSlot = p.administrations.find(a => a.timeSlot === slot.key.toUpperCase());
                tasks.push({
                    prescription: p,
                    slotKey: slot.key.toUpperCase(),
                    slotLabel: slot.label,
                    isDone: !!adminForSlot,
                    adminData: adminForSlot
                });
            }
        });
    });

    return (
        <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>
                Administrações de Hoje - {new Date().toLocaleDateString('pt-PT')}
            </h1>

            {tasks.length === 0 ? (
                <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
                    Nenhuma medicação agendada para hoje.
                </div>
            ) : (
                <div className={styles.grid}>
                    {tasks.map((task, idx) => (
                        <AdminRecordItem
                            key={`${task.prescription.id}-${task.slotKey}`}
                            prescription={task.prescription}
                            timeSlot={task.slotKey}
                            timeSlotLabel={task.slotLabel}
                            isDone={task.isDone}
                            adminData={task.adminData}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
