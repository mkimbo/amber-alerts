"use client";

import React, { useEffect } from "react";
import { useAuth } from "../../../auth/hooks";
import styles from "../page.module.scss";
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
import { MdVerifiedUser } from "react-icons/md";
import Cookies from "js-cookie";
type TUserProfile = z.infer<typeof updateUserSchema>;
interface UserProfileProps {
  profile: TUserProfile;
}

export function UserProfile({ profile }: UserProfileProps) {
  const { tenant } = useAuth();
  const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
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
  useEffect(() => {
    const verified = Cookies.get("userVerified");
    if (verified) {
      setVerified(true);
    }
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

  function extractUsername(email: string) {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      const name = email.slice(0, atIndex);
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return email;
  }

  if (!tenant) {
    return null;
  }

  if (!profile.notificationToken) {
    localforage.removeItem("fcm_token");
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profileCard}>
        <div className={styles.profileImage}>
          {tenant.photoUrl && (
            <img alt={`${tenant.email}`} src={tenant.photoUrl} />
          )}
        </div>
        <div className={styles.userInfo}>
          <div className={styles.name}>
            {tenant.email ? extractUsername(tenant.email) : "John Doe"}

            <span>
              {verified && <MdVerifiedUser fontSize={1} color="#ff4400" />}
            </span>
          </div>
          <div className={styles.email}>{tenant.email}</div>
          <div className={styles.points}>
            VP : <span>580</span>
          </div>
          <div className={styles.points}>
            RP : <span>58</span>
          </div>
        </div>
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
