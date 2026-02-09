"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";
import styles from "@/app/login/login.module.css";

export default function LoginForm() {
    const [errorMessage, dispatch, isPending] = useActionState(
        authenticate,
        undefined
    );

    return (
        <form action={dispatch}>
            <div className={styles.formGroup}>
                <label htmlFor="username" className={styles.label}>
                    Username
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className={styles.input}
                />
            </div>
            <button type="submit" disabled={isPending} className={styles.button}>
                {isPending ? "Signing in..." : "Sign in"}
            </button>

            {errorMessage && (
                <div className={styles.error} aria-live="polite">
                    {errorMessage}
                </div>
            )}
        </form>
    );
}
