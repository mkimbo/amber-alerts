"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSave,
} from "react-icons/md";
import { useAuth } from "../../../auth/hooks";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { uploadFileToCloud } from "../../../auth/firebase";
import { toast } from "react-toastify";
import { newAlertFormSchema } from "@/models/zod_schemas";
import { useZact } from "zact/client";
import { saveAlert } from "@/app/actions";
import { Button } from "@/ui/button";

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

export type TFormSchema = z.infer<typeof newAlertFormSchema>;
export function NewAlertForm() {
  const { tenant } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [savingFiles, setSavingFiles] = useState(false);
  const methods = useForm<TFormSchema>({
    resolver: zodResolver(newAlertFormSchema),
    reValidateMode: "onChange",
    defaultValues: {
      fullname: "Test User",
      images: [],
      othername: "",
      age: 12,
      complexion: "Dark",
      gender: "F",
      secondaryContact: "0722222222",
      lastSeenDate: new Date().toISOString(),
      lastSeenDescription:
        "They were last seen wearing clothes and shoes. They had a bag with them. They were last seen at the bus stop.",
      obNumber: "7857454885485",
    },
  });

  const { handleSubmit, formState, trigger } = methods;
  const { mutate, data, isLoading } = useZact(saveAlert);

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
      router.push(`/cases/${data.id}`);
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
                    "fullname",
                    "othername",
                    "age",
                    "gender",
                    "complexion",
                    "images",
                  ]);
                  if (result) setCurrentStep(currentStep + 1);
                }
                if (currentStep == 2) {
                  const result = await trigger([
                    "fullname",
                    "othername",
                    "age",
                    "gender",
                    "complexion",
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
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
        </div>
      </div>
    </FormProvider>
  );
}
