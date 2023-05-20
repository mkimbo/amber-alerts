import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";
import PersonList from "./PersonList";
import { getMissingPersonList } from "./getCases";

export default async function MissingPersonList() {
  const data = await getMissingPersonList();
  return (
    <>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <div className={styles.container}>
          <PersonList personList={data} />
        </div>
      </ServerAuthProvider>
    </>
  );
}
