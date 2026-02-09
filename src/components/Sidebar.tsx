"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import {
    HomeIcon,
    UsersIcon,
    BeakerIcon,
    ClipboardDocumentCheckIcon,
    ShieldCheckIcon,
    ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";

const links = [
    { name: "Início", href: "/dashboard", icon: HomeIcon },
    { name: "Doentes", href: "/dashboard/patients", icon: UsersIcon },
    { name: "Medicamentos", href: "/dashboard/medications", icon: BeakerIcon },
    { name: "Fichas", href: "/dashboard/records", icon: ClipboardDocumentCheckIcon },
    { name: "Audit", href: "/dashboard/audit", icon: ShieldCheckIcon },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.topSection}>
                <div className={styles.logo}>Care Meds</div>
            </div>

            <nav className={styles.nav}>
                {links.map((link) => {
                    const LinkIcon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                        >
                            <LinkIcon className={styles.icon} />
                            <span className={styles.linkText}>{link.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <button
                    className={styles.logoutBtn}
                    onClick={() => {
                        // Logout logic handled in layout/actions
                    }}
                >
                    <ArrowLeftOnRectangleIcon className={styles.icon} />
                    <span>Sair</span>
                </button>
            </div>
        </aside>
    );
}
