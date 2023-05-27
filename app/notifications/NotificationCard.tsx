"use client";
import * as React from "react";
import styles from "./page.module.scss";
import { TSaveNotification } from "../../models/missing_person.model";
import { useAuth } from "@/auth/hooks";
import { format } from "date-fns";
import Link from "next/link";

type PersonCardProps = {
  notification: TSaveNotification;
};

export default function NotificationCard({ notification }: PersonCardProps) {
  const { tenant } = useAuth();
  const userObj = notification.notifiedUsers.find(
    (item) => item.userId === tenant?.id
  );

  const getLink = (type: string) => {
    switch (type) {
      case "person":
        return `/persons/${notification.resourceId}`;
      case "vehicle":
        return `/vehicles/${notification.resourceId}`;
      case "bike":
        return `/bikes/${notification.resourceId}`;
      default:
        return `/persons/${notification.resourceId}`;
    }
  };

  return (
    <Link
      href={getLink(notification.resourceType)}
      className={styles.notificationCard}
    >
      <div className={styles.notificationCardHeader}>
        {notification.content}
      </div>
      <div className={styles.notificationCardBody}>
        <div className={styles.notificationCardBodyLeft}>
          {format(new Date(notification.createdAt), "do MMM yyyy")}
        </div>
        <div
          className={styles.notificationCardBodyRight}
        >{`${userObj?.distance.toFixed(2)} km away`}</div>
      </div>
    </Link>
  );
}
