import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";
import NotificationList from "./NotificationList";

export default function MissingPersonList() {
  return (
    <>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <div className={styles.container}>
          <NotificationList />
        </div>
      </ServerAuthProvider>
    </>
  );
}
