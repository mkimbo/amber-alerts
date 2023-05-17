import React from "react";
import { Control, Controller } from "react-hook-form";
import styles from "./inputs.module.scss";

type Props = {
  name: string;
  type?: string;
  control: Control<any>;
  placeholder?: string;
};

export default function FormTextField({
  name,
  type,
  control,
  placeholder,
}: Props) {
  return (
    <div className={styles.textFieldWrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              {...field}
              id={name}
              name={name}
              onChange={(e) => {
                if (type == "number") {
                  field.onChange(parseInt(e.target.value));
                } else {
                  field.onChange(e.target.value);
                }
              }}
              type={type}
              className={styles.input}
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
