"use client";

import * as React from "react";
import { useAuth } from "../../auth/hooks";
import styles from "./page.module.scss";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PhoneNumberRegex } from "../../utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import { useLoadingCallback } from "react-loading-hook";
import { getVerifiedCookie, setVerifiedCookie } from "../../utils/functions";
interface IAddPhoneNumber {
  referer: string;
}

type TPhoneNumber = {
  phoneNumber: string;
};

const schema = z.object({
  phoneNumber: z.string().regex(PhoneNumberRegex),
});

export function RegisterForm() {
  const { tenant } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const methods = useForm<TPhoneNumber>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: { phoneNumber: "" },
  });
  React.useEffect(() => {
    const redirect = searchParams?.get("redirect");
    if (!redirect) {
      router.push("/");
    }
    const verified = getVerifiedCookie();
    if (verified === "true" && redirect) {
      router.push(redirect);
    }
  }, [router, searchParams]);
  const redirect = searchParams?.get("redirect") || "/";
  const { handleSubmit, control, formState } = methods;
  const [handleRegister, isRegisterLoading] = useLoadingCallback(
    async (phoneNumber: string) => {
      const response = await fetch("/api/add-phone-number", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
      });
      if (response.status === 200) {
        const params = new URLSearchParams();
        params.append("phoneNumber", phoneNumber);
        params.append("redirect", redirect);
        const url = `/verify?${params.toString()}`;
        router.push(url);
      }
    }
  );

  if (!tenant) {
    return null;
  }
  return (
    <FormProvider {...methods}>
      {/* <h3>Phone Number</h3> */}
      <p>
        To ensure timely responses and facilitate urgent communication when
        required, we kindly request you to provide your phone number for mobile
        number verification purposes. Please rest assured that your phone number
        will be treated with the utmost confidentiality and will not be shared
        with any third parties.
      </p>
      <div>
        <div className={styles.inputField}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <input {...field} required />
            )}
          />
        </div>
        <Button
          loading={isRegisterLoading}
          disabled={isRegisterLoading}
          onClick={() =>
            handleSubmit((values) => {
              const phoneNumber = `+254${values.phoneNumber.slice(1)}`;
              handleRegister(phoneNumber);
            })()
          }
        >
          Submit
        </Button>
      </div>
    </FormProvider>
  );
}
