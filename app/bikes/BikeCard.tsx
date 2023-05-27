"use client";
import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import styles from "./page.module.scss";
import sampleMissing from "../../public/missing-person.webp";
import { placeholderUrl } from "../../utils/constants";
import { IoLogoModelS } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { truncateText } from "../../utils/functions";
import { TMotor } from "@/models/misssing_motor.model";

type BikeCardProps = {
  bike: TMotor;
};

export default function BikeCard({ bike }: BikeCardProps) {
  function toSentenceCase(str: string) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) {
      return c.toUpperCase();
    });
  }
  return (
    <Link className={styles.searchHit} href={`/vehicles/${bike.id}`}>
      <div className={styles.hitImage}>
        <Image
          className={styles.hitImage}
          src={bike.images!.length! > 0 ? bike.images[0]! : sampleMissing}
          alt={bike.licencePlate + " image"}
          width={120}
          height={120}
          placeholder="blur"
          blurDataURL={placeholderUrl}
        />
      </div>
      <div className={styles.hitDetails}>
        <div
          className={styles.hitName}
        >{` ${bike.make} ${bike.model} ${bike.year}`}</div>
        <div className={styles.hitExtra}>
          <IoLogoModelS color={"#ff4400"} fontSize={20} />
          <span>{bike.licencePlate}</span>
        </div>
        <div className={styles.hitLocation}>
          <MdOutlineLocationOn
            className={styles.locationIcon}
            color={"#ff4400"}
            fontSize={20}
          />
          <span>{` ${truncateText(
            toSentenceCase(bike.lastSeenLocation!),
            50
          )}`}</span>
        </div>
      </div>
    </Link>
  );
}
