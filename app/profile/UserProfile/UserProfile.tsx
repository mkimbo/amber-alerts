"use client";

import React, { useEffect, useState } from "react";
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
import sampleMissing from "../../../public/missing-person.webp";
import { z } from "zod";
import { AllowNotificationsButton } from "../AllowNotifications";
import localforage from "localforage";
import { MdVerifiedUser } from "react-icons/md";
import Cookies from "js-cookie";
import Image from "next/image";
import { placeholderUrl } from "../../../utils/constants";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormRadioGroup from "@/ui/form_radio_buttons";
import FormCheckboxGroup from "@/ui/form_checkbox";
import { useZact } from "zact/client";
import { updateUser } from "@/app/actions";
import { toast } from "react-toastify";
type TUserProfile = z.infer<typeof updateUserSchema>;
interface UserProfileProps {
  profile: TUserProfile;
}

export function UserProfile({ profile }: UserProfileProps) {
  const { tenant } = useAuth();
  const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  const [hasLoggedOut, setHasLoggedOut] = useState(false);
  const [verified, setVerified] = useState(false);
  const { mutate, data, isLoading } = useZact(updateUser);
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

  const subscribeFormSchema = z.object({
    distance: z.string().nonempty("Required"),
    person: z.boolean(),
    vehicle: z.boolean().optional(),
    bike: z.boolean().optional(),
  });

  type TSubscribeForm = z.infer<typeof subscribeFormSchema>;

  const methods = useForm<TSubscribeForm>({
    resolver: zodResolver(subscribeFormSchema),
    reValidateMode: "onChange",
    defaultValues: {
      distance: profile.alertRadius?.toString() ?? "5",
      person: profile.missingPersonAlerts ?? false,
      vehicle: profile.missingVehicleAlerts ?? false,
      bike: profile.missingBikeAlerts ?? false,
    },
  });

  const { handleSubmit, control, formState } = methods;

  function extractUsername(email: string) {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      const name = email.slice(0, atIndex);
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return email;
  }

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

  if (data) {
    toast.success("Profile updated successfully");
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profileCard}>
        <div className={styles.profileImage}>
          <Image
            src={tenant.photoUrl ? tenant.photoUrl : sampleMissing}
            alt={tenant.email! + " profile picture"}
            width={120}
            height={120}
            placeholder="blur"
            blurDataURL={placeholderUrl}
          />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.name}>
            {tenant.email ? extractUsername(tenant.email) : "John Doe"}

            <span>
              {verified && <MdVerifiedUser fontSize={15} color="#ff4400" />}
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
      <AllowNotificationsButton
        enabledNotifications={!!profile.notificationToken}
      />
      <SaveLocationButton enabledLocation={profile.enabledLocation} />
      <div className={styles.settingCard}>
        {!!profile.notificationToken && (
          <div className={styles.settingBody}>
            <div className={styles.settingContent}>
              <FormProvider {...methods}>
                <div className={styles.sectionTitle}>Preferences</div>
                <div className={styles.fieldLabel}>
                  Choose your preferred distance for alerts.
                </div>
                <FormRadioGroup
                  name="distance"
                  options={[
                    {
                      label: "3 km",
                      value: "3",
                    },
                    {
                      label: "5 km",
                      value: "5",
                    },

                    {
                      label: "10 km",
                      value: "10",
                    },
                    {
                      label: "50 km",
                      value: "50",
                    },
                  ]}
                />
                <div className={styles.fieldLabel}>
                  Choose your preferred types of alerts.
                </div>
                <FormCheckboxGroup
                  name="person"
                  label="Missing Person"
                  checked={profile.missingPersonAlerts}
                  disabled={profile.missingPersonAlerts}
                  defaultChecked={profile.missingPersonAlerts}
                />
                <FormCheckboxGroup
                  name="vehicle"
                  defaultChecked={profile.missingVehicleAlerts}
                  label="Missing Vehicle"
                />
                <FormCheckboxGroup
                  name="bike"
                  defaultChecked={profile.missingBikeAlerts}
                  label="Missing Motorbike"
                />
              </FormProvider>
            </div>
            <div className={styles.settingActions}>
              <Button
                loading={isLoading}
                disabled={isLoading}
                style={{ width: "100%" }}
                onClick={() => {
                  handleSubmit((values) => {
                    mutate({
                      id: tenant.id,
                      missingPersonAlerts: values.person,
                      missingVehicleAlerts: values.vehicle,
                      missingBikeAlerts: values.bike,
                      alertRadius: Number(values.distance),
                    });
                  })();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.buttonGroup}>
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
