"use client";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styles from "./inputs.module.scss";

type Props = {
  name: string;
};

export default function FormFileUpload({ name }: Props) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<String[]>([]);
  const { setValue, getValues, control } = useFormContext();
  const validateImage = (image: File, i = 0) => {
    if (!image) return false;
    if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
      setErrors([...errors, `File ${i + 1} is not a valid image type`]);
      return false;
    } else if (image.size > 3000000) {
      setErrors([...errors, `File ${i + 1} is larger than 3MB`]);
      return false;
    }
    return true;
  };

  useEffect(() => {
    get(getValues(), name) && setPreviews(get(getValues(), name));
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file1 = event.target.files![0];
    const file2 = event.target.files![1];
    const validFiles: string[] = [];
    if (!file1 && !file2) return;
    setErrors([]);
    if (file1 && file2) {
      const files = [file1, file2];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validFile = validateImage(file, i);
        if (validFile) {
          validFiles.push(URL.createObjectURL(file));
        }
      }
      if (!errors.length) {
        setPreviews(validFiles);
        setValue(name, validFiles, { shouldValidate: true });
      }
    } else {
      const file = file1 || file2;
      const validFile = validateImage(file);
      if (validFile) {
        validFiles.push(URL.createObjectURL(file));
      }
      if (!errors.length) {
        setPreviews(validFiles);
        setValue(name, validFiles, { shouldValidate: true });
      }
    }
  };
  return (
    <div className={styles.textFieldWrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <>
            <input
              {...field}
              type="file"
              value={""}
              multiple
              id="fileInput"
              onChange={async (event) => {
                await handleFileChange(event);
              }}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput" className={styles.uploadPreview}>
              {previews.length ? (
                previews.map((e) => (
                  <img
                    key={e}
                    src={e}
                    alt="Preview"
                    style={{ maxHeight: "100px", maxWidth: "100px" }}
                  />
                ))
              ) : (
                <div className={styles.uploadView}>Upload</div>
              )}
            </label>
            <div className={styles.uploaded}>
              {fieldState.error && (
                <span style={{ color: "#ff4400", alignSelf: "start" }}>
                  {fieldState.error.message}
                </span>
              )}
              {errors.length > 0 &&
                errors.map((e) => (
                  <span style={{ color: "#ff4400", alignSelf: "start" }}>
                    {e}
                  </span>
                ))}
            </div>
          </>
        )}
      />
    </div>
  );
}
