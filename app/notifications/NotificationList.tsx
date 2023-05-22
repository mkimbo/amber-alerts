"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { TSaveNotification } from "../../models/missing_person.model";
import { getDatabase, onValue, ref } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
import { clientConfig } from "@/config/client-config";
import { useAuth } from "@/auth/hooks";
import NotificationCard from "./NotificationCard";
import classNames from "classnames";
import { markNotificationsAsSeen } from "../actions";

export default function NotificationList() {
  const [activeIdx, setActiveIdx] = useState(0);

  const tabButtonClasses0 = classNames(styles.tabButton, {
    [styles.tabButtonActive]: activeIdx === 0,
  });
  const tabButtonClasses1 = classNames(styles.tabButton, {
    [styles.tabButtonActive]: activeIdx === 1,
  });
  const tabButtonClasses2 = classNames(styles.tabButton, {
    [styles.tabButtonActive]: activeIdx === 2,
  });
  const tabButtonClasses3 = classNames(styles.tabButton, {
    [styles.tabButtonActive]: activeIdx === 3,
  });
  const [NotificationList, setNotificationList] = useState<TSaveNotification[]>(
    []
  );
  const { tenant } = useAuth();
  const db = getDatabase(
    !getApps().length ? initializeApp(clientConfig) : getApp()
  );
  const notificationsRef = ref(db, "notifications");
  useEffect(() => {
    if (!tenant || tenant?.isAnonymous) return;

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
      markNotificationsAsSeen({
        tenantID: tenant?.id,
        list: notificationsArray,
      });
    });
  }, [tenant, db]);

  return (
    <>
      <div className={styles.header}>
        <span onClick={() => setActiveIdx(0)} className={tabButtonClasses0}>
          All
        </span>
        <span onClick={() => setActiveIdx(1)} className={tabButtonClasses1}>
          Persons
        </span>
        <span onClick={() => setActiveIdx(2)} className={tabButtonClasses2}>
          Sightings
        </span>
        <span onClick={() => setActiveIdx(3)} className={tabButtonClasses3}>
          Property
        </span>
      </div>
      <div id="scrollableDiv" className={styles.listContainer}>
        {NotificationList.length > 0 &&
          NotificationList.map((notification) => (
            <NotificationCard
              notification={notification}
              key={notification.id}
            />
          ))}

        {NotificationList.length === 0 && (
          <div id="scrollableDiv" className={styles.listContainer}>
            <div className={styles.noResult}>
              <p>No results found</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
