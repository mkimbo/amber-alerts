"use client";

import * as React from "react";
import { useAuth } from "../../../../auth/hooks";
import styles from "./page.module.scss";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoadingCallback } from "react-loading-hook";
import { MdSave } from "react-icons/md";
import { TPerson } from "../../../../models/missing_person.model";
import FormDatePicker from "../../../../ui/form_date_picker";
import FormLocationInput from "../../../../ui/form_location_input";
import FormTextArea from "../../../../ui/form_text_area";
import FormTextField from "../../../../ui/form_text_field";
import { useZact } from "zact/client";
import { savePersonSighting, saveMotorSighting } from "@/app/actions";
import { Button } from "@/ui/button";
import { toast } from "react-toastify";
import { newSightingFormSchema } from "@/models/zod_schemas";
import { TMotor } from "@/models/misssing_motor.model";
type Props = {
  missingItem: TPerson | TMotor;
  type: "person" | "motor";
};

export function NewSightingForm({ missingItem, type }: Props) {
  const { tenant } = useAuth();
  const router = useRouter();

  const sightingFormSchema = z.intersection(
    newSightingFormSchema,
    z.object({
      sightingDate: z.string().nonempty("Required"),
    })
  );

  type TSightingForm = z.infer<typeof sightingFormSchema>;

  const methods = useForm<TSightingForm>({
    resolver: zodResolver(sightingFormSchema),
    reValidateMode: "onChange",
    defaultValues: { sightingDate: new Date().toDateString() },
  });

  const { handleSubmit, control, formState } = methods;
  const { mutate, data, isLoading } = useZact(saveMotorSighting);
  const {
    mutate: sendit,
    data: response,
    isLoading: isRunning,
  } = useZact(savePersonSighting);

  const getProgressBar = (progressBar: string) => {
    return (
      <div className={styles.progressbar}>
        <div className={styles.progress} style={{ width: progressBar }}></div>
      </div>
    );
  };

  React.useEffect(() => {
    if (data?.success || response?.success) {
      toast.success("Thank you, the user has been notified!");
      router.back();
    }
  }, [data, response]);

  if (!tenant) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <form>
        <div className={styles.stepperWrapper}>
          <div className={styles.stepperHeader}>
            <div className={styles.stepperBack}></div>
            <Button
              loading={isLoading || isRunning}
              disabled={isLoading || isRunning}
              onClick={async () => {
                handleSubmit((values) => {
                  if (type == "motor") {
                    mutate({
                      ...values,
                      sightedBy: tenant.id,
                      itemId: missingItem.id!,
                    });
                  }
                  if (type == "person") {
                    sendit({
                      ...values,
                      sightedBy: tenant.id,
                      itemId: missingItem.id!,
                    });
                  }
                })();
              }}
            >
              Save
            </Button>
          </div>
          {getProgressBar(`100%`)}
          <div className={styles.stepperBody}>
            <div className={styles.additionalInfo}>
              <div
                className={styles.additionalInfoTitle}
              >{`Please provide info on where/when the sighting happened`}</div>
              <div className={styles.additionalInfoField}>
                <div className={styles.label}> Sighting date: </div>
                <FormDatePicker
                  minDate={new Date(missingItem.lastSeenDate)}
                  maxDate={new Date()}
                  name="sightingDate"
                  control={control}
                />
              </div>
              <div className={styles.additionalInfoField}>
                <div className={styles.label}> Sighting location: </div>
                <FormLocationInput name="sightingLocation" control={control} />
              </div>
              <div className={styles.additionalInfoField}>
                <div className={styles.label}>Description:</div>
                <FormTextArea
                  rows={5}
                  name="sightingDescription"
                  control={control}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
