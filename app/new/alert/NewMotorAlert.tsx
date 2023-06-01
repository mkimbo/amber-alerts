"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useAuth } from "../../../auth/hooks";
import { uploadFileToCloud } from "../../../auth/firebase";
import { toast } from "react-toastify";
import { newMotorAlertSchema } from "@/models/zod_schemas";
import { useZact } from "zact/client";
import { saveAlert, saveMotorAlert } from "@/app/actions";
import { Button } from "@/ui/button";
//import { getFileObjectFromBlobUrl } from "@/utils/functions";
import { MotorStep1 } from "./MotorStep1";
import { MotorStep2 } from "./MotorStep2";
import { MotorStep3 } from "./MotorStep3";

export function getFileObjectFromBlobUrl(blobUrl: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", blobUrl);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(`Failed to retrieve file from ${blobUrl}.`);
      }
    };
    xhr.onerror = () => {
      reject(`Failed to retrieve file from ${blobUrl}.`);
    };
    xhr.send();
  });
}

export type TFormSchema = z.infer<typeof newMotorAlertSchema>;
export function NewMotorAlert() {
  const { tenant } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [savingFiles, setSavingFiles] = useState(false);

  const methods = useForm<TFormSchema>({
    resolver: zodResolver(newMotorAlertSchema),
    reValidateMode: "onChange",
    defaultValues: {
      motorType: "vehicle",
      make: "BMW",
      images: [],
      model: "X5",
      year: "2019",
      color: "Black",
      licencePlate: "KCA 123A",
      secondaryContact: "0722222222",
      lastSeenDate: new Date().toISOString(),
      lastSeenDescription:
        "My car is gone man. Plaese help me find it. I was at the mall and when I came back it was gone.",
      obNumber: "7857454885485",
    },
  });

  const { handleSubmit, formState, trigger } = methods;
  const { mutate, data, isLoading } = useZact(saveMotorAlert);

  const getProgressBar = (progressBar: string) => {
    return (
      <div className={styles.progressbar}>
        <div className={styles.progress} style={{ width: progressBar }}></div>
      </div>
    );
  };
  useEffect(() => {
    if (data?.success) {
      toast.success(`Alert was sent to ${data?.numUsersNotified} nearby users`);
      if (data?.motorType === "vehicle") {
        router.push(`/vehicels/${data.id}`);
      }
      if (data?.motorType === "bike") {
        router.push(`/bikes/${data.id}`);
      }
    }
  }, [data]);

  if (!tenant) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <div className={styles.stepperWrapper}>
        <div className={styles.stepperHeader}>
          <div
            onClick={() => setCurrentStep(currentStep - 1)}
            className={styles.stepperBack}
          >
            {currentStep != 1 && <MdKeyboardArrowLeft fontSize={25} />}
            {currentStep != 1 && <span>Back</span>}
          </div>
          {currentStep != 3 && (
            <div
              onClick={async () => {
                if (currentStep == 1) {
                  const result = await trigger([
                    "motorType",
                    "make",
                    "model",
                    "year",
                    "color",
                    "licencePlate",
                    "images",
                  ]);
                  if (result) setCurrentStep(currentStep + 1);
                }
                if (currentStep == 2) {
                  const result = await trigger([
                    "motorType",
                    "make",
                    "model",
                    "year",
                    "color",
                    "licencePlate",
                    "images",
                    "lastSeenDescription",
                    "lastSeenDate",
                    "lastSeenLocation",
                    "secondaryContact",
                    "placeId",
                  ]);
                  if (result) setCurrentStep(currentStep + 1);
                }
              }}
              className={styles.stepperNext}
            >
              <span>Next</span>
              <MdKeyboardArrowRight fontSize={25} />
            </div>
          )}
          {currentStep == 3 && (
            <div className={styles.stepperSave}>
              <Button
                loading={savingFiles || isLoading}
                disabled={savingFiles || isLoading}
                onClick={async () => {
                  handleSubmit(async (values) => {
                    const files: string[] = [];
                    setSavingFiles(true);
                    for await (const item of values.images) {
                      const file = await getFileObjectFromBlobUrl(item);
                      const downloadUrl = await uploadFileToCloud(file);
                      if (downloadUrl) {
                        files.push(downloadUrl);
                      }
                    }

                    if (files.length < 1) {
                      return;
                    }
                    const data = {
                      ...values,
                      createdBy: tenant?.id,
                      images: files,
                      found: false,
                    };

                    mutate(data);
                    setSavingFiles(false);
                  })();
                }}
              >
                Save
              </Button>
            </div>
          )}
        </div>
        {getProgressBar(`${Math.round((currentStep / 3) * 100).toString()}%`)}
        <div className={styles.stepperBody}>
          {currentStep === 1 && <MotorStep1 />}
          {currentStep === 2 && <MotorStep2 />}
          {currentStep === 3 && <MotorStep3 />}
        </div>
      </div>
    </FormProvider>
  );
}
