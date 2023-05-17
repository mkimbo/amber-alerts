import classNames from "classnames";
import React from "react";
import { Control, Controller } from "react-hook-form";
import styles from "./inputs.module.scss";

type Props = {
  name: string;
  required?: boolean;
  control: Control<any>;
  placeholder?: string;
  className?: string;
  options: { value: string; label: string }[];
};

export default function FormSelect({
  name,
  required,
  control,
  placeholder,
  options,
  className,
}: Props) {
  const selectClasses = classNames(styles.formSelect, {
    [className!]: className,
  });
  return (
    <div className={selectClasses}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: required }}
        render={({ field, fieldState }) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <select {...field}>
              {/* <option value="">Select</option> */}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
