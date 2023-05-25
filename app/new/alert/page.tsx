import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../../auth/server-auth-provider";
import { NewPersonAlert } from "./NewPersonAlert";
import { NewMotorAlert } from "./NewMotorAlert";
export default function NewAlert(props: any) {
  const alertType = props.searchParams.type;
  if (!alertType) {
    throw new Error("Missing alert type");
  }
  return (
    <div className={styles.container}>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        {alertType === "person" && <NewPersonAlert />}
        {alertType === "motor" && <NewMotorAlert />}
      </ServerAuthProvider>
    </div>
  );
}
