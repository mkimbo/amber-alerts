"use client";

import * as React from "react";
import styles from "./page.module.scss";
import { useFormContext } from "react-hook-form";
import FormTextField from "../../../ui/form_text_field";
import FormSelect from "../../../ui/form_select";
import FormFileUpload from "../../../ui/form_file_upload";

export function MotorStep1() {
  const { control } = useFormContext();

  return (
    <div className={styles.missingPersonInfo}>
      <div className={styles.missingPersonInfoTitle}>
        {" "}
        Missing Vehicle/Bike Info
      </div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}> Type: </div>
        <FormSelect
          name="motorType"
          control={control}
          options={[
            { value: "vehicle", label: "Vehicle" },
            { value: "bike", label: "Bike" },
          ]}
        />
      </div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}> Make: </div>
        <FormTextField name="make" placeholder="Make" control={control} />
      </div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}> Model: </div>
        <FormTextField name="model" placeholder="Model" control={control} />
      </div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}>Year: </div>
        <FormTextField name="year" placeholder="Year" control={control} />
      </div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}>Color: </div>
        <FormTextField name="color" placeholder="Color" control={control} />
      </div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}>Licence Plates: </div>
        <FormTextField
          name="licencePlate"
          placeholder="eg. KCA 123A"
          control={control}
        />
      </div>
      <div className={styles.missingPersonInfoField}>
        <div className={styles.label}> Photos: </div>
        <FormFileUpload name="images" />
      </div>
    </div>
  );
}
