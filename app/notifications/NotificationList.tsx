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
  const [notificationList, setNotificationList] = useState<TSaveNotification[]>(
    []
  );
  const [personList, setPersonList] = useState<TSaveNotification[]>([]);
  const [motorsList, setMotorsList] = useState<TSaveNotification[]>([]);

  const [sightingsList, setSightingsList] = useState<TSaveNotification[]>([]);
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
      // group notifications by resource type
      const persons = notificationsArray.filter(
        (notification) => notification.resourceType === "person"
      );
      const motors = notificationsArray.filter(
        (notification) =>
          notification.resourceType === "vehicle" ||
          notification.resourceType === "bike"
      );
      const sightings = notificationsArray.filter(
        (notification) => notification.resourceType === "sighting"
      );
      setPersonList(persons);
      setMotorsList(motors);
      setSightingsList(sightings);
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
          Vehicles/Bikes
        </span>
        <span onClick={() => setActiveIdx(3)} className={tabButtonClasses3}>
          Sightings
        </span>
      </div>
      <div id="scrollableDiv" className={styles.listContainer}>
        {notificationList.length > 0 && (
          <>
            {activeIdx === 0 &&
              notificationList.map((notification) => {
                return (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                );
              })}

            {activeIdx === 1 &&
              personList.map((notification) => {
                return (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                );
              })}
            {activeIdx === 2 &&
              motorsList.map((notification) => {
                return (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                );
              })}
            {activeIdx === 3 &&
              sightingsList.map((notification) => {
                return (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                );
              })}
          </>
        )}

        {notificationList.length === 0 && (
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
