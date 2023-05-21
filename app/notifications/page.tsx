import styles from "./page.module.scss";
import {
  ServerAuthProvider,
  getTenantFromCookies,
} from "../../auth/server-auth-provider";
import NotificationList from "./NotificationList";
import { serverRTDB } from "@/utils/firebase";
import { TPerson, TSaveNotification } from "@/models/missing_person.model";
import { cookies } from "next/headers";

async function getNotificationList() {
  let data: any[] = [];
  //const db = getDatabase();
  const ref = serverRTDB.ref("notifications");
  const tenant = await getTenantFromCookies(cookies);
  const query = ref.orderByChild("notifiedUsers");
  const snapshot = await query.get();

  snapshot.forEach(function (childSnapshot) {
    const notification: TSaveNotification = childSnapshot.val();
    data = [...data, ...notification.notifiedUsers];
  });
  const UserNotifications = data.filter(
    (notification) => notification.userId === tenant?.id
  );
  console.log(UserNotifications, "snapshot");
  // Attach an asynchronous callback to read the data at our notifications reference
  //   ref.on(
  //     "value",
  //     (snapshot) => {
  //       console.log(snapshot.val(), "snapshot");
  //       snapshot.forEach(function (childSnapshot) {
  //         const notification: TSaveNotification = childSnapshot.val();
  //         data = [
  //           ...data,
  //           ...notification.notifiedUsers,
  //         ];
  //       });
  //     //   const Unseen = notificationsArray.filter(
  //     //     (notification) =>
  //     //       notification.userId === tenant?.id && !notification.seen
  //     //   );
  //     },
  //     (errorObject) => {
  //       console.log("The read failed: " + errorObject.name);
  //     }
  //   );
}

export default async function MissingPersonList() {
  const data = await getNotificationList();
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
