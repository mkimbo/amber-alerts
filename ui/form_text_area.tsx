import React from "react";
import { Control, Controller } from "react-hook-form";
import styles from "./inputs.module.scss";

type Props = {
  name: string;
  rows: number;
  control: Control<any>;
  placeholder?: string;
};

export default function FormTextArea({
  name,
  rows,
  control,
  placeholder,
}: Props) {
  return (
    <div className={styles.textArea}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <textarea
              {...field}
              id={name}
              name={name}
              rows={rows}
              className={styles.textarea}
              placeholder={placeholder}
            />
            {fieldState.error && (
              <span style={{ color: "#ff4400", alignSelf: "start" }}>
                {fieldState.error.message}
              </span>
            )}
          </div>
        )}
      />
    </div>
  );
}
