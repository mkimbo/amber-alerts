"use client";

import * as React from "react";
import styles from "./page.module.scss";
import { useFormContext } from "react-hook-form";
import FormDatePicker from "../../../ui/form_date_picker";
import FormLocationInput from "../../../ui/form_location_input";
import FormTextField from "../../../ui/form_text_field";
import FormTextArea from "../../../ui/form_text_area";

export function MotorStep2() {
  const { control } = useFormContext();
  const now = new Date().getTime();
  const minDate = new Date(now - 72 * 60 * 60 * 1000);
  return (
    <div className={styles.additionalInfo}>
      <div className={styles.additionalInfoTitle}> Additional Info</div>
      <div className={styles.additionalInfoField}>
        <div className={styles.label}> Last seen date: </div>
        <FormDatePicker
          minDate={minDate}
          maxDate={new Date()}
          name="lastSeenDate"
          control={control}
        />
      </div>
      <div className={styles.additionalInfoField}>
        <div className={styles.label}> Last seen location: </div>
        <FormLocationInput
          name="lastSeenLocation"
          control={control}
          placeholder="Enter the location the car/bike was last seen"
        />
      </div>
      <div className={styles.additionalInfoField}>
        <div className={styles.label}>Last seen description:</div>
        <FormTextArea rows={5} name="lastSeenDescription" control={control} />
      </div>
      <div className={styles.additionalInfoField}>
        <div className={styles.label}> Owner Contacts: </div>
        <FormTextField
          name="secondaryContact"
          placeholder="Phone number/email"
          control={control}
        />
      </div>
    </div>
  );
}
