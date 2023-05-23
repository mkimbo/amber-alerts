import React from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import styles from "./inputs.module.scss";

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
};

const FormRadioGroup: React.FC<RadioGroupProps> = ({ name, options }) => {
  const { control } = useFormContext();

  return (
    <div className={styles.radioGroup}>
      {options.map((option) => (
        <div key={option.value} className={styles.radioOption}>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.label}</label>
              </>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default FormRadioGroup;
