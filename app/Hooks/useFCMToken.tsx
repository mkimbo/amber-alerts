"use client";
/* globals window */
import { getFCMToken } from "@/auth/firebase";
import { useAuth } from "@/auth/hooks";
import { useZact } from "zact/client";
import { FirebaseOptions } from "firebase/app";
import { useState, useEffect } from "react";
import { updateUser } from "../actions";
import localforage from "localforage";

const useFCMToken = (options: FirebaseOptions) => {
  const [token, setToken] = useState<string | null>(null);
  const { tenant } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { mutate, data, isLoading } = useZact(updateUser);
  useEffect(() => {
    if (!tenant) return;
    const enabledNotifications = Notification.permission === "granted";
    console.log("permission check in useFCM", enabledNotifications);
    if (!enabledNotifications) return;
    const fetchToken = async () => {
      try {
        const response = await getFCMToken(options);
        console.log("useFCMToken -> response", response);
        if (!response) {
          throw new Error("Failed to fetch data");
        }
        localforage.setItem("fcm_token", response);
        localforage.setItem("enabledNotifications", true);
        setToken(response);
        await mutate({
          id: tenant?.id!,
          notificationToken: response,
          enabledNotifications: true,
        });
      } catch (error) {
        setError(!!error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [options, tenant]);

  return { token, loading, error };
};

export default useFCMToken;
