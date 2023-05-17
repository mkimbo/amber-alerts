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
  }, []);
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

    await getUser(tenant.id);
  });
  const getUser = async (id: string) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "GET",
      });

      if (res?.status == 200) {
        setVerifiedCookie("true");
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
      <h2>Let your community help locate missing loved ones</h2>
      {!tenant && !isLoading && !hasLogged && (
        <div className={styles.info}>
          <p>
            <LoadingIcon />
          </p>
        </div>
      )}
      {!hasLogged && (
        <Button
          loading={isLoading}
          disabled={isLoading || !tenant}
          onClick={handleLoginWithGoogle}
        >
          Log in with Google
        </Button>
      )}
      {hasLogged && (
        <div className={styles.info}>
          <p>
            Redirecting to <strong>{params?.get("redirect") || "/"}</strong>{" "}
            <LoadingIcon />
          </p>
        </div>
      )}
    </div>
  );
}
