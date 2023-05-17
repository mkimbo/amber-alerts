"use client";
import React, { BaseSyntheticEvent, useState } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import styles from "./inputs.module.scss";
import Autocomplete from "react-google-autocomplete";
import { processPlaceDetails } from "../utils/functions";
import { set } from "lodash";

type Props = {
  name: string;
  control: Control<any>;
};

export default function FormLocationInput({ name, control }: Props) {
  const [errors, setErrors] = useState<String[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { setValue, setError, clearErrors } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Autocomplete
            {...field}
            placeholder="Enter the location the person was last seen"
            className={styles.formLocationInput}
            onLoad={() => {
              inputRef!.current!.value = "";
            }}
            ref={inputRef}
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            options={{
              types: [],
              componentRestrictions: { country: "ke" },
            }}
            onBlur={(e: BaseSyntheticEvent) => {
              setValue(name, e.target.value, { shouldValidate: true });
              setValue("placeId", "", { shouldValidate: true });
            }}
            onPlaceSelected={async (place) => {
              console.log(place);
              const res = await processPlaceDetails(place);
              if (!res) {
                setErrors([
                  ...errors,
                  `Error processing location, please choose another nearby landmark`,
                ]);
                return field.onChange("");
              }
              setErrors([]);
              setValue("placeId", res.placeId, { shouldValidate: true });
              setValue("geoloc", res.geoloc, { shouldValidate: true });
              setValue("geohash", res.geohash, { shouldValidate: true });
              setValue("longAddress", res.longAddress, {
                shouldValidate: true,
              });
              setValue("formattedAddress", res.formattedAddress, {
                shouldValidate: true,
              });
              setValue("county", res.county, { shouldValidate: true });
              setValue("constituency", res.constituency, {
                shouldValidate: true,
              });
              const inputElement = inputRef.current;
              setValue(name, inputElement?.value);
            }}
          />
          {formState.errors?.placeId && (
            <span style={{ color: "#ff4400", alignSelf: "start" }}>
              {formState.errors?.placeId?.message as string}
            </span>
          )}
          {errors.length > 0 &&
            errors.map((e) => (
              <span style={{ color: "#ff4400", alignSelf: "start" }}>{e}</span>
            ))}
        </div>
      )}
    />
  );
}
