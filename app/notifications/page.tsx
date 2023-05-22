import styles from "./page.module.scss";
import {
  ServerAuthProvider,
  // getTenantFromCookies,
} from "../../auth/server-auth-provider";
import NotificationList from "./NotificationList";
// import { serverRTDB } from "@/utils/firebase";
// import { TPerson, TSaveNotification } from "@/models/missing_person.model";
// import { cookies } from "next/headers";

// async function getNotificationList(): Promise<TSaveNotification[]> {
//   let data: any[] = [];
//   //const db = getDatabase();
//   const ref = serverRTDB.ref("/notifications");
//   const tenant = await getTenantFromCookies(cookies);
//   // const query = ref.orderByChild("notifiedUsers");
//   const snapshot = await ref.get();

//   snapshot.forEach(function (childSnapshot) {
//     const notification: TSaveNotification = childSnapshot.val();
//     data = [...data, ...notification.notifiedUsers];
//   });
//   const UserNotifications = data.filter(
//     (notification) => notification.userId === tenant?.id
//   );
//   console.log(UserNotifications, "snapshot");

//   return UserNotifications;
// }

export default function MissingPersonList() {
  // const data = await getNotificationList();
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
