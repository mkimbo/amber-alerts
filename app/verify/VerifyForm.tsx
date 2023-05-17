"use client";

import React, { useEffect } from "react";
import { useAuth } from "../../auth/hooks";
import styles from "./page.module.scss";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import { useLoadingCallback } from "react-loading-hook";
import { setVerifiedCookie, getVerifiedCookie } from "../../utils/functions";
type TVerificationCode = {
  verificationCode: string;
};

const schema = z.object({
  verificationCode: z.string().min(6),
});

export function VerifyForm() {
  const { tenant } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const methods = useForm<TVerificationCode>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: { verificationCode: "" },
  });

  useEffect(() => {
    const redirect = searchParams?.get("redirect") || "/";
    const phoneNumber = searchParams?.get("phoneNumber");
    if (!phoneNumber || !redirect) {
      router.push("/");
    }
    const verified = getVerifiedCookie();
    if (verified === "true") {
      router.push(redirect);
    }
  }, []);

  const { handleSubmit, control, formState } = methods;
  const [handleVerify, isVerifyLoading] = useLoadingCallback(
    async (verificationCode: string) => {
      const redirect = searchParams?.get("redirect") || "/";
      const phoneNumber = searchParams?.get("phoneNumber");
      const response = await fetch("/api/verify-phone-number", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: tenant?.id,
          email: tenant?.email,
          phoneNumber: phoneNumber,
          otp: verificationCode,
          photoUrl: tenant?.photoUrl,
        }),
      });
      if (response.status === 200) {
        setVerifiedCookie("true");
        window.location.reload();
      }
    }
  );

  if (!tenant) {
    //throw error for error boundary (error page)
    return null;
  }
  return (
    <FormProvider {...methods}>
      <form>
        {/* <h3>Confirm</h3> */}
        <p>Enter the verification code sent to your phone number.</p>
        <div>
          <div className={styles.inputField}>
            <Controller
              name="verificationCode"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <input {...field} required />
              )}
            />
          </div>
          <Button
            loading={isVerifyLoading}
            disabled={isVerifyLoading}
            onClick={() =>
              handleSubmit((values) => {
                handleVerify(values.verificationCode);
              })()
            }
          >
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
