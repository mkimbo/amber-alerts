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
import { getGeoHash } from "@/utils/functions";
export default function NotificationsHandler({
  activeIdx,
}: {
  activeIdx: number;
}) {
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
