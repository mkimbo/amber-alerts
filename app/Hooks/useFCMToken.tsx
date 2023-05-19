"use client";
/* globals window */
import { getFCMToken } from "@/auth/firebase";
import { useAuth } from "@/auth/hooks";
import { useZact } from "zact/client";
import { FirebaseOptions } from "firebase/app";
import { useState, useEffect } from "react";
import { updateUser } from "../actions";
import localforage from "localforage";
import { toast } from "react-toastify";

const useFCMToken = (options: FirebaseOptions) => {
  const [token, setToken] = useState<string | null>(null);
  const { tenant } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { mutate, data, isLoading } = useZact(updateUser);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const localToken = await localforage.getItem("fcm_token");
        console.log("useFCMToken -> localToken", localToken);
        if (localToken) return setToken(localToken.toString());
        if (tenant?.id!) {
          const status = await Notification.requestPermission();
          if (!status || status !== "granted") {
            toast.error(
              "Please allow notifications as they are needed for alerts"
            );
          }
          const token = await getFCMToken(options);
          console.log("useFCMToken -> response", token);
          if (!token) {
            throw new Error("Error getting token");
          }
          localforage.setItem("fcm_token", token);
          localforage.setItem("enabledNotifications", true);
          await mutate({
            id: tenant?.id!,
            notificationToken: token,
            enabledNotifications: true,
          });
          return setToken(token);
        }
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
