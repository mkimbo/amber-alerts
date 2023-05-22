"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import {
  TNotifiedUser,
  TPerson,
  TSaveNotification,
} from "../../models/missing_person.model";
import { getDatabase, onValue, ref } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
import { clientConfig } from "@/config/client-config";
import { useAuth } from "@/auth/hooks";

type PersonCardProps = {
  notificationsList: TSaveNotification[];
};

export default function NotificationList() {
  const [NotificationList, setNotificationList] = useState<TSaveNotification[]>(
    []
  );
  const { tenant } = useAuth();
  const db = getDatabase(
    !getApps().length ? initializeApp(clientConfig) : getApp()
  );
  useEffect(() => {
    if (!tenant || tenant?.isAnonymous) return;
    const notificationsRef = ref(db, "notifications");
    onValue(notificationsRef, (snapshot) => {
      let notificationsArray: TSaveNotification[] = [];
      snapshot.forEach(function (childSnapshot) {
        const notification: TSaveNotification = childSnapshot.val();
        //get all notifications that match the tenant id
        notification.notifiedUsers.forEach((user) => {
          if (user.userId === tenant?.id) {
            notificationsArray = [...notificationsArray, notification];
          }
        });
      });

      setNotificationList(notificationsArray);
    });
  }, [tenant, db]);

  return (
    <>
      <div className={styles.header}>Notifications tabs</div>

      {NotificationList.length === 0 && (
        <div id="scrollableDiv" className={styles.listContainer}>
          <div className={styles.noResult}>
            <p>No results found</p>
          </div>
        </div>
      )}
    </>
  );
}
