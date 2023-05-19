"use client";
import React, { useEffect, useState } from "react";
import { useZact } from "zact/client";
import { updateUser } from "../actions";
import localforage from "localforage";
import { getFCMToken, getOnMessage } from "@/auth/firebase";
import { clientConfig } from "@/config/client-config";
import { toast } from "react-toastify";
import { useAuth } from "@/auth/hooks";
import styles from "./navbar.module.scss";
import { AiOutlineInfoCircle } from "react-icons/ai";
export default function NotificationsHandler({
  activeIdx,
}: {
  activeIdx: number;
}) {
  const [error, setError] = useState(false);
  const { mutate, data, isLoading } = useZact(updateUser);
  const { tenant } = useAuth();
  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (!tenant || tenant?.isAnonymous) return;
        const localToken = await localforage.getItem("fcm_token");
        // console.log("useFCMToken -> localToken", localToken);
        if (!localToken) {
          const status = await Notification.requestPermission();
          if (!status || status !== "granted") {
            return setError(true);
          }
          const token = await getFCMToken(clientConfig);
          console.log("useFCMToken -> remoteToken", token);
          if (!token) {
            toast.error("Error getting token");
          }
          await mutate({
            id: tenant?.id!,
            notificationToken: token,
            enabledNotifications: true,
          });
          await localforage.setItem("fcm_token", token);
          setError(false);
        }
        getOnMessage(clientConfig);
        // console.log("listening for messages");
      } catch (error) {
        console.log("error getting token", error);
      }
    };

    fetchToken();
  }, [activeIdx, tenant]);

  if (error && !tenant?.isAnonymous) {
    return (
      <div className={styles.navInfoText}>
        <AiOutlineInfoCircle fontSize={20} color={"#ff4400"} />
        <span>You have not allowed notifications!</span>
      </div>
    );
  }

  return <></>;
}
