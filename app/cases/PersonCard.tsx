"use client";
import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import sampleMissing from "../../public/missing-person.webp";
import { placeholderUrl } from "../../utils/constants";
import { CgGenderMale, CgGenderFemale } from "react-icons/cg";
import { MdOutlineLocationOn } from "react-icons/md";
import { truncateText } from "../../utils/functions";
import { TPerson } from "../../models/missing_person.model";

type PersonCardProps = {
  person: TPerson;
};

export default function PersonCard({ person }: PersonCardProps) {
  const genderIcon =
    person.gender == "Male" ? (
      <CgGenderMale color={"#ff4400"} fontSize={25} />
    ) : (
      <CgGenderFemale color={"#ff4400"} fontSize={25} />
    );

  function toSentenceCase(str: string) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) {
      return c.toUpperCase();
    });
  }
  return (
    <Link className={styles.searchHit} href={`/cases/${person?.id}`}>
      <Image
        className={styles.hitImage}
        src={person.images!.length! > 0 ? person.images[0]! : sampleMissing}
        alt={person.fullname}
        width={120}
        height={120}
        placeholder="blur"
        blurDataURL={placeholderUrl}
      />

      <div className={styles.hitDetails}>
        <div className={styles.hitName}>{person.fullname}</div>
        <div className={styles.hitExtra}>
          {genderIcon}
          <span>{` ${person.age}yrs`}</span>
        </div>
        <div className={styles.hitLocation}>
          <MdOutlineLocationOn
            className={styles.locationIcon}
            color={"#ff4400"}
            fontSize={20}
          />
          <span>{` ${truncateText(
            toSentenceCase(person.lastSeenLocation),
            50
          )}`}</span>
        </div>
      </div>
    </Link>
  );
}
