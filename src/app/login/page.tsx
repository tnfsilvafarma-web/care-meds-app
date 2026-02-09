import LoginForm from "@/components/LoginForm";
import styles from "./login.module.css";

export default function LoginPage() {
    return (
        <main className={styles.mainContainer}>
            <div className={styles.loginWrapper}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Care Meds</h1>
                    <p className={styles.subtitle}>Enter your credentials to access the system</p>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}
