"use client";

import * as React from "react";
import styles from "./page.module.scss";
import { useFormContext } from "react-hook-form";
import policeInfo from "../../../public/pStations.json";
import FormAutoCompleteSelect from "../../../ui/form_autocomplete_select";
import { RiGovernmentLine } from "react-icons/ri";
import FormTextField from "../../../ui/form_text_field";

export function Step3() {
  const { control } = useFormContext();
  const stations = Array.from(policeInfo)
    .filter((item) => item.label.includes("Police Station"))
    .map((item) => {
      return {
        label: item.label,
        value: `${item.value}`,
      };
    });
  return (
    <div className={styles.legalInfo}>
      <div className={styles.legalInfoTitle}> Finally...</div>
      <div className={styles.legalInfoField}>
        <div className={styles.label}> Police Station: </div>
        <FormAutoCompleteSelect
          name="policeStation"
          placeholder="Police Station where the case was reported"
          options={stations}
          control={control}
          icon={<RiGovernmentLine fontSize={15} color={"#ff4400"} />}
        />
      </div>

      <div className={styles.legalInfoField}>
        <div className={styles.label}> OB Number: </div>
        <FormTextField
          name="obNumber"
          placeholder="Occurrence Book Number"
          control={control}
        />
      </div>
    </div>
  );
}
