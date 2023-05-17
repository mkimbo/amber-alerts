import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";
import { VerifyForm } from "./VerifyForm";

export default function Register() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Verify</h2>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <VerifyForm />
      </ServerAuthProvider>
    </div>
  );
}
