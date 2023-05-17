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
import { saveSighting } from "@/app/actions";
import { Button } from "@/ui/button";
import { toast } from "react-toastify";
import { newSightingFormSchema } from "@/models/zod_schemas";
type Props = {
  missingPerson: TPerson;
};

export function NewSightingForm({ missingPerson }: Props) {
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
  const { mutate, data, isLoading } = useZact(saveSighting);

  const getProgressBar = (progressBar: string) => {
    return (
      <div className={styles.progressbar}>
        <div className={styles.progress} style={{ width: progressBar }}></div>
      </div>
    );
  };

  React.useEffect(() => {
    if (data?.success) {
      toast.success("Alert created successfully");
      router.push(`/cases/${missingPerson.id}`);
    }
  }, [data]);

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
              loading={isLoading}
              disabled={isLoading}
              onClick={async () => {
                handleSubmit((values) => {
                  mutate({
                    ...values,
                    sightedBy: tenant.id,
                    personId: missingPerson.id!,
                  });
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
              >{` Have you seen ${missingPerson.fullname}?`}</div>
              <div className={styles.additionalInfoField}>
                <div className={styles.label}> Sighting date: </div>
                <FormDatePicker
                  minDate={new Date(missingPerson.lastSeenDate)}
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
