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
import { ref, onValue, getDatabase } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
export default function NotificationsHandler({
  activeIdx,
}: {
  activeIdx: number;
}) {
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>("" || null);
  const { mutate, data, isLoading } = useZact(updateUser);
  const { tenant } = useAuth();
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
  const db = getDatabase(
    !getApps().length ? initializeApp(clientConfig) : getApp()
  );

  useEffect(() => {
    if (!tenant || tenant?.isAnonymous) return;
    const starCountRef = ref(db, "notifications");
    onValue(starCountRef, (snapshot) => {
      let notificationsArray: any[] = [];
      snapshot.forEach(function (childSnapshot) {
        const notification = childSnapshot.val();
        notificationsArray = [
          ...notificationsArray,
          ...notification.TNotifiedUser,
        ];
      });

      notificationsArray.forEach((notification) => {
        if (notification.userId === tenant?.id && !notification.seen) {
          setCount((prev) => prev + 1);
        }
      });
    });
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

  if (count === 0) return <></>;

  return (
    <div className={styles.navInfo}>
      <div className={styles.navInfoText}>
        <IoNotificationsCircleOutline fontSize={20} color={"#ff4400"} />
        <span>{`${count} notifications`}</span>
      </div>
    </div>
  );
}
