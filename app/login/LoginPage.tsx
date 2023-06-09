"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useFirebaseAuth } from "../../auth/firebase";
import { clientConfig } from "../../config/client-config";
import { useLoadingCallback } from "react-loading-hook";
import { getGoogleProvider, loginWithProvider } from "./firebase";
import { useAuth } from "../../auth/hooks";
import styles from "./login.module.scss";
import { Button } from "../../ui/button";
import { LoadingIcon } from "../../ui/icons";
import { getVerifiedCookie, setVerifiedCookie } from "../../utils/functions";
import localforage from "localforage";
import { VscBroadcast } from "react-icons/vsc";
import LandingInfo from "../Components/LandingInfo";

export function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [hasLogged, setHasLogged] = React.useState(false);
  const { tenant } = useAuth();
  const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  const searchParams = useSearchParams();
  React.useEffect(() => {
    const redirect = searchParams?.get("redirect") || "/";
    const verified = getVerifiedCookie();
    if (verified === "true") {
      if (!redirect) {
        router.push("/");
      } else {
        router.push(redirect);
      }
    }
  }, [router, searchParams]);
  const [handleLoginWithGoogle, isLoading] = useLoadingCallback(async () => {
    setHasLogged(false);
    const { GoogleAuthProvider } = await import("firebase/auth");
    const auth = await getFirebaseAuth();
    const tenant = await loginWithProvider(
      auth,
      await getGoogleProvider(auth),
      GoogleAuthProvider.credentialFromError
    );
    await fetch("/api/login", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tenant.idToken}`,
      },
    });
    setHasLogged(true);
    router.refresh();
    const redirect = params?.get("redirect");
    router.replace(redirect ?? "/");
    await getUser(tenant.id);
  });
  const getUser = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "GET",
      });

      if (res?.status == 200) {
        const data = await res.json();
        console.log(data, "logged in user data");
        if (data?.phoneNumber?.verified) {
          setVerifiedCookie("true");
        }
        localforage.setItem("enabledNotifications", data?.enabledNotifications);
        localforage.setItem("enabledLocation", data?.enabledLocation);
      } else {
        console.log("User not verified");
      }
      router.refresh();
      const redirect = params?.get("redirect");
      router.replace(redirect ?? "/");
      return res;
    } catch (error) {
      console.log("error fetching user", error);
    }
  };

  return (
    <div className={styles.page}>
      <LandingInfo />

      {!hasLogged && (
        <>
          <div className={styles.card}></div>
          <Button
            loading={isLoading}
            disabled={isLoading || !tenant}
            onClick={handleLoginWithGoogle}
          >
            Log in with Google
          </Button>
        </>
      )}
      {!tenant && !isLoading && !hasLogged && (
        <div className={styles.info}>
          <p>
            <LoadingIcon />
          </p>
        </div>
      )}
      {hasLogged && (
        <p className={styles.info}>
          <span>
            Redirecting to{" "}
            <strong>{params?.get("redirect") || "home page"}</strong>{" "}
          </span>
          <LoadingIcon />
        </p>
      )}
    </div>
  );
}
