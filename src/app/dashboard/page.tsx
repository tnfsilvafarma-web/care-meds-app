import {
    UsersIcon,
    ClipboardDocumentCheckIcon,
    ExclamationCircleIcon
} from "@heroicons/react/24/outline";
import styles from "./dashboard_home.module.css";

export default async function DashboardPage() {
    const stats = [
        { name: 'Doentes Ativos', value: '0', icon: UsersIcon, color: '#2563eb' },
        { name: 'Medicamentos p/ Administrar', value: '0', icon: ClipboardDocumentCheckIcon, color: '#16a34a' },
        { name: 'Alertas Pendentes', value: '0', icon: ExclamationCircleIcon, color: '#dc2626' },
    ];

    return (
        <div>
            <h1 className={styles.title}>Visão Geral</h1>

            <div className={styles.statsGrid}>
                {stats.map((item) => (
                    <div key={item.name} className={styles.card}>
                        <div className={styles.iconWrapper} style={{ color: item.color }}>
                            <item.icon className="icon-size-6" style={{ width: '24px', height: '24px' }} />
                        </div>
                        <div>
                            <p className={styles.cardLabel}>{item.name}</p>
                            <p className={styles.cardValue}>{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.placeholder}>
                <p>Atividade recente aparecerá aqui.</p>
            </div>
        </div>
    );
}
