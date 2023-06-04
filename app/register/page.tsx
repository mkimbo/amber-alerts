import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";
import { RegisterForm } from "./RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register and verify your account",
};

export default function Register() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <RegisterForm />
      </ServerAuthProvider>
    </div>
  );
}
