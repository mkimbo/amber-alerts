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

type VehicleCardProps = {
  vehicle: TMotor;
};

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  function toSentenceCase(str: string) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) {
      return c.toUpperCase();
    });
  }
  return (
    <Link className={styles.searchHit} href={`/vehicles/${vehicle?.id}`}>
      <div className={styles.hitImage}>
        <Image
          className={styles.hitImage}
          src={vehicle.images!.length! > 0 ? vehicle.images[0]! : sampleMissing}
          alt={vehicle.licencePlate + " image"}
          width={120}
          height={120}
          placeholder="blur"
          blurDataURL={placeholderUrl}
        />
      </div>
      <div className={styles.hitDetails}>
        <div
          className={styles.hitName}
        >{` ${vehicle.make} ${vehicle.model} ${vehicle.year}`}</div>
        <div className={styles.hitExtra}>
          <IoLogoModelS color={"#ff4400"} fontSize={20} />
          <span>{vehicle.licencePlate}</span>
        </div>
        <div className={styles.hitLocation}>
          <MdOutlineLocationOn
            className={styles.locationIcon}
            color={"#ff4400"}
            fontSize={20}
          />
          <span>{` ${truncateText(
            toSentenceCase(vehicle.lastSeenLocation!),
            50
          )}`}</span>
        </div>
      </div>
    </Link>
  );
}
