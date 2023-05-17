import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../../auth/server-auth-provider";
import { NewAlertForm } from "./NewAlertForm";

export default function NewAlert() {
  return (
    <div className={styles.container}>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <NewAlertForm />
      </ServerAuthProvider>
    </div>
  );
}
