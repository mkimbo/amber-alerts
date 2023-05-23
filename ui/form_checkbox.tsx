import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import styles from "./inputs.module.scss";
interface CheckboxOption {
  value: string;
  label: string;

  required?: boolean;
}

interface CheckboxProps {
  name: string;
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
}

export default function FormCheckbox({
  name,
  checked,
  defaultChecked,
  label,
  disabled,
}: CheckboxProps) {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={styles.checkbox}>
            <label>
              <input
                {...field}
                type="checkbox"
                defaultChecked={defaultChecked}
                checked={checked}
                value={field.value}
                disabled={disabled}
              />
              <span>{label}</span>
            </label>
          </div>
        )}
      />
    </div>
  );
}
