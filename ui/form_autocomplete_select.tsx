"use client";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import styles from "./inputs.module.scss";
import Fuse from "fuse.js";
import { get } from "lodash";
type Props = {
  name: string;
  control: Control<any>;
  options: Option[];
  icon?: React.ReactNode;
  placeholder?: string;
};

type Option = {
  label: string;
  value: string;
};

const fuseOptions = {
  keys: ["label", "value"],
  threshold: 0.3,
};

export default function FormAutoCompleteSelect({
  name,
  control,
  options,
  icon,
  placeholder,
}: Props) {
  const fuse = new Fuse(options, fuseOptions);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Option[]>([]);

  const { getValues } = useFormContext();
  const handleInputChange = (event: BaseSyntheticEvent) => {
    const { value } = event.target;
    setInputValue(value);
    const results = fuse.search(value).map(({ item }) => item);
    setSuggestions(results);
  };

  const handleSelect = (selected: Option) => {
    setInputValue(selected.label);

    setSuggestions([]);
  };

  useEffect(() => {
    get(getValues(), name) && setInputValue(get(getValues(), name));
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={styles.autoCompleteSelect}>
          <input
            {...field}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
            placeholder={placeholder}
          />
          <div className={styles.suggestions}>
            {suggestions.map((option) => (
              <div
                key={option.value}
                className={styles.suggestion}
                onClick={() => {
                  handleSelect(option);
                  field.onChange(option.label);
                }}
              >
                {icon ? (
                  <span className={styles.suggestionLabel}>
                    {icon}
                    {option.label}
                  </span>
                ) : (
                  <span>{option.label}</span>
                )}
              </div>
            ))}
          </div>
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
