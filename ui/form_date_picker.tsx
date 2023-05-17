"use client";
import React from "react";
import { Control, Controller } from "react-hook-form";
import styles from "./inputs.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  name: string;
  control: Control<any>;
  minDate?: Date;
  maxDate?: Date;
};

export default function FormDatePicker({
  name,
  control,
  minDate,
  maxDate,
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <DatePicker
            minDate={minDate}
            maxDate={maxDate}
            selected={new Date(field.value)}
            onChange={(date) => field.onChange(date?.toDateString())}
            className={styles.formDatePicker}
            placeholderText="Enter the date the person was last seen"
          />
          {fieldState.error && (
            <span style={{ color: "#ff4400", alignSelf: "start" }}>
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}
