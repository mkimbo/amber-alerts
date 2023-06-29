import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../../auth/server-auth-provider";

import { Metadata } from "next";
import PoliceContacts from "./PoliceContacts";

export const metadata: Metadata = {
  title: "Police Contacts",
  description: "Police Contacts List",
};

export default function PoliceContactList() {
  return (
    <>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <div className={styles.container}>
          <PoliceContacts />
        </div>
      </ServerAuthProvider>
    </>
  );
}
