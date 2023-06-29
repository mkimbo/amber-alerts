"use client";
import * as React from "react";
import styles from "./page.module.scss";
import { BsFillTelephoneFill } from "react-icons/bs";
import { PoliceContact } from "./PoliceContacts";

type ContactCardProps = {
  police: PoliceContact;
};

export default function ContactCard({ police }: ContactCardProps) {
  return (
    <div className={styles.searchHit}>
      <div className={styles.hitDetails}>
        <div className={styles.hitName}>{police.name}</div>
        <div className={styles.hitExtra}>
          <BsFillTelephoneFill fontSize={15} color={"#ff4400"} />
          <span>{` ${police.tel}`}</span>
        </div>
        {police.tel2 && (
          <div className={styles.hitLocation}>
            <BsFillTelephoneFill color={"#ff4400"} fontSize={15} />
            <span>{` ${police.tel2}`}</span>
          </div>
        )}
      </div>
    </div>
  );
}
