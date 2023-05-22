"use client";
import React, { useEffect, useState } from "react";
import { useZact } from "zact/client";
import { updateUser } from "../actions";
import localforage from "localforage";
import { getFCMToken, getOnMessage, useFirebaseRTDB } from "@/auth/firebase";
import { clientConfig } from "@/config/client-config";
import { toast } from "react-toastify";
import { useAuth } from "@/auth/hooks";
import styles from "./navbar.module.scss";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { getGeoHash } from "@/utils/functions";
import { ref, onValue, getDatabase, onChildChanged } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
import { set } from "lodash";
import {
  TNotifiedUser,
  TSaveNotification,
} from "@/models/missing_person.model";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function NotificationsHandler({
  activeIdx,
}: {
  activeIdx: number;
}) {
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>("" || null);
  const { mutate, data, isLoading } = useZact(updateUser);
  const { tenant } = useAuth();
  const router = useRouter();
  const db = getDatabase(
    !getApps().length ? initializeApp(clientConfig) : getApp()
  );
  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (!tenant || tenant?.isAnonymous) return;
        const localToken = await localforage.getItem("enabledNotifications");
        // console.log("useFCMToken -> localToken", localToken);
        if (!localToken) {
          const status = await Notification.requestPermission();
          if (!status || status !== "granted") {
            return setError("You have not allowed notifications!");
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
          await localforage.setItem("enabledNotifications", true);
          toast.success("Notifications enabled  successfully");
          setError(null);
        }

        getOnMessage(clientConfig);
      } catch (error) {
        console.log("error getting token", error);
      }
    };
    const handleGetLocation = async () => {
      if (!tenant || tenant?.isAnonymous) return;

      const successCallback = async (geoPosition: GeolocationPosition) => {
        const position = {
          lat: geoPosition?.coords?.latitude,
          lng: geoPosition?.coords?.longitude,
        };
        const geohash = getGeoHash(position);
        await mutate({
          id: tenant?.id!,
          geohash: geohash,
          lat: geoPosition?.coords?.latitude,
          lng: geoPosition?.coords?.longitude,
          enabledLocation: true,
        });

        if (data?.success) {
          toast.success("Location enabled successfully");
          await localforage.setItem("enabledLocation", true);
          setError(null);
          //  revalidatePath("/profile");
          return true;
        } else {
          return false;
        }
      };

      const errorCallback = (error: GeolocationPositionError) => {
        console.log(error);
        setError("You have not updated your location!");
        return false;
      };

      const geolocationOptions = {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      };

      if ("geolocation" in navigator) {
        const locate = await localforage.getItem("enabledLocation");
        if (locate) return;
        // Access the API
        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback,
          geolocationOptions
        );
      } else {
        // Use a third-party geolocation service
        setError("Browser does not support the Geolocation API");
      }
    };

    fetchToken().then((res) => {
      if (error) {
        return;
      }
      handleGetLocation().then((res) => {
        if (error) {
          return;
        }
      });
    });
  }, [activeIdx, tenant]);

  useEffect(() => {
    if (!tenant || tenant?.isAnonymous) return;
    const notificationsRef = ref(db, "notifications");

    onValue(notificationsRef, (snapshot) => {
      let notificationsArray: TNotifiedUser[] = [];
      snapshot.forEach(function (childSnapshot) {
        const notification: TSaveNotification = childSnapshot.val();
        notificationsArray = [
          ...notificationsArray,
          ...notification.notifiedUsers,
        ];
      });
      const Unseen = notificationsArray.filter(
        (notification) =>
          notification.userId === tenant?.id && !notification.seen
      );

      if (Unseen.length > 0) setCount(Unseen.length);
    });
    // onChildChanged(notificationsRef, (snapshot) => {
    //   let notificationsArray: TNotifiedUser[] = [];
    //   snapshot.forEach(function (childSnapshot) {
    //     const notification: TSaveNotification = childSnapshot.val();
    //     notificationsArray = [
    //       ...notificationsArray,
    //       ...notification.notifiedUsers,
    //     ];
    //   });
    //   const Unseen = notificationsArray.filter(
    //     (notification) =>
    //       notification.userId === tenant?.id && !notification.seen
    //   );

    //   if (Unseen.length > 0) setCount(Unseen.length);
    // });
  }, [tenant, db]);

  if (error && !tenant?.isAnonymous) {
    return (
      <div className={styles.navInfo}>
        <div className={styles.navInfoText}>
          <AiOutlineInfoCircle fontSize={20} color={"#ff4400"} />
          <span>You have not allowed notifications!</span>
        </div>
      </div>
    );
  }

  //if (count === 0) return null;

  return (
    <div className={styles.navInfo}>
      <div
        onClick={() => {
          router.push("/notifications");
        }}
        className={styles.navInfoText}
      >
        <IoNotificationsCircleOutline fontSize={20} color={"#ff4400"} />
        <span>{`${count} notifications`}</span>
      </div>
    </div>
  );
}
