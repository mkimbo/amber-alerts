"use client";

import React, { useEffect } from "react";
import { useAuth } from "../../../auth/hooks";
import styles from "./UserProfile.module.scss";
import { useFirebaseAuth } from "../../../auth/firebase";
import { useLoadingCallback } from "react-loading-hook";
import { clientConfig } from "../../../config/client-config";
import { Button } from "../../../ui/button";
import { LoadingIcon } from "../../../ui/icons";
import { deleteVerifiedCookie } from "../../../utils/functions";
import { SaveLocationButton } from "../GetLocation";
import { updateUserSchema } from "@/models/zod_schemas";
import { z } from "zod";
import { AllowNotificationsButton } from "../AllowNotifications";
import localforage from "localforage";
type TUserProfile = z.infer<typeof updateUserSchema>;
interface UserProfileProps {
  profile: TUserProfile;
}

export function UserProfile({ profile }: UserProfileProps) {
  const { tenant } = useAuth();
  const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
  const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
    const auth = await getFirebaseAuth();
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
    setHasLoggedOut(true);
    await fetch("/api/logout", {
      method: "GET",
    });
    deleteVerifiedCookie();
    window.location.reload();
  });

  useEffect(() => {
    localforage.setItem("enabledNotifications", !!profile.notificationToken);
    localforage.setItem("enabledLocation", profile.enabledLocation);
  }, [profile]);

  if (!tenant && hasLoggedOut) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>
          You are being logged out... <LoadingIcon />
        </h3>
      </div>
    );
  }

  if (!tenant) {
    return null;
  }

  if (!profile.notificationToken) {
    localforage.removeItem("fcm_token");
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}></div>
      <h3 className={styles.title}>You are logged in as</h3>
      <div className={styles.content}>
        <div className={styles.avatar}>
          {tenant.photoUrl && (
            <img alt={`${tenant.email}`} src={tenant.photoUrl} />
          )}
          {/* {tenant.photoUrl && <img src={tenant.photoUrl} />    <Image
              alt={`${tenant.email}`}
              width={100}
              height={100}
              src={tenant.photoUrl}
            />} */}
        </div>
        <span>{tenant.email}</span>
      </div>
      <div className={styles.buttonGroup}>
        <AllowNotificationsButton
          enabledNotifications={!!profile.notificationToken}
        />
        <SaveLocationButton enabledLocation={profile.enabledLocation} />
        <Button
          loading={isLogoutLoading}
          disabled={isLogoutLoading}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}

// const [handleRefresh, isRefreshLoading] = useLoadingCallback(async () => {
//   if (!tenant) {
//     return;
//   }

//   await fetch("/api/refresh-tokens", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${tenant.idToken}`,
//     },
//   });
// });

// const [handleClaims, isClaimsLoading] = useLoadingCallback(async () => {
//   if (!tenant) {
//     return;
//   }

//   await fetch("/api/custom-claims", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${tenant.idToken}`,
//     },
//   });
// });
