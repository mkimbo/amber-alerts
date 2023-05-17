"use client";

import * as React from "react";
import styles from "./UserProfile.module.scss";

import { useLoadingCallback } from "react-loading-hook";
import { useAuth } from "../../../auth/hooks";
import { useFirebaseAuth } from "../../../auth/firebase";
import { clientConfig } from "../../../config/client-config";
import { useRouter, useSearchParams } from "next/navigation";

export function UserProfile() {
  // const { tenant } = useAuth();
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  // const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
  // const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
  //   await fetch("/api/logout", {
  //     method: "GET",
  //   });
  // });
  // React.useEffect(() => {
  //   const redirect = searchParams?.get("id");
  //   if (!redirect) {
  //     router.push("/search");
  //   }
  // }, []);

  // if (!tenant) {
  //   return null;
  // }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}></h3>
    </div>
  );
}
