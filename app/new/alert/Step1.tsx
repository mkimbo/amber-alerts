"use client";

import * as React from "react";
import styles from "./page.module.scss";
import { useFormContext } from "react-hook-form";
import FormTextField from "../../../ui/form_text_field";
import FormSelect from "../../../ui/form_select";
import FormFileUpload from "../../../ui/form_file_upload";

export function Step1() {
  const { control } = useFormContext();

  return (
    <div className={styles.missingPersonInfo}>
      <div className={styles.missingPersonInfoTitle}> Missing Person Info</div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}> Full Name: </div>
        <FormTextField
          name="fullname"
          placeholder="Full Name"
          control={control}
        />
      </div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}> Other Name: </div>
        <FormTextField
          name="othername"
          placeholder="Nickname/Aliases"
          control={control}
        />
      </div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}> Age: </div>
        <FormTextField
          name="age"
          type="number"
          placeholder="Age"
          control={control}
        />
      </div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}> Gender: </div>
        <FormSelect
          name="gender"
          control={control}
          options={[
            { value: "F", label: "Female" },
            { value: "M", label: "Male" },
            { value: "O", label: "Other" },
          ]}
        />
      </div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}> Complexion: </div>
        <FormSelect
          name="complexion"
          control={control}
          options={[
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
          ]}
        />
      </div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}> Photos: </div>
        <FormFileUpload name="images" />
      </div>
    </div>
  );
}
