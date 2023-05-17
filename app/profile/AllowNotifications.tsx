"use client";

import * as React from "react";
import { useAuth } from "../../auth/hooks";
import { Button } from "../../ui/button";
import { getGeoHash } from "../../utils/functions";
import { useZact } from "zact/client";
import { updateUser } from "../actions";
import { toast } from "react-toastify";
import { revalidatePath } from "next/cache";
import localforage from "localforage";
import { getFCMToken } from "@/auth/firebase";
import { clientConfig } from "@/config/client-config";
const environment = process.env.NODE_ENV || "development";
type TButtonProps = {
  enabledNotifications?: boolean;
};

export function AllowNotificationsButton({
  enabledNotifications,
}: TButtonProps) {
  const { tenant } = useAuth();
  const { mutate, data, isLoading } = useZact(updateUser);

  const handleSubscribe = async () => {
    const status = await Notification.requestPermission();
    if (!status || status !== "granted") {
      toast.error("You have denied notifications");
    }
    const fcm_token = await getFCMToken(clientConfig);
    if (fcm_token) {
      await mutate({
        id: tenant?.id!,
        notificationToken: fcm_token,
        enabledNotifications: true,
      });
      localforage.setItem("fcm_token", fcm_token);
      //Todo
      //set enabled to true in user object
      //setUser({ ...user, enabledNotifications: true });
    } else {
      return toast.error("FCM token not found");
    }
  };

  if (!tenant) {
    return null;
  }

  if (data?.success) {
    revalidatePath("/profile");
    toast.success("Notifications enabled");
  }

  return (
    <Button loading={isLoading} disabled={isLoading} onClick={handleSubscribe}>
      Enable Notifications
    </Button>
  );
}
