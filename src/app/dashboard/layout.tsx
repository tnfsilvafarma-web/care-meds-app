import Sidebar from "@/components/Sidebar";
import styles from "./dashboard.module.css";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            <Sidebar />
            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <div className={styles.searchBar}>
                        {/* Search Placeholder */}
                    </div>
                    <div className={styles.userProfile}>
                        {/* User Profile Placeholder */}
                    </div>
                </div>
                <div className={styles.pageContent}>
                    {children}
                </div>
            </main>
        </div>
    );
}
