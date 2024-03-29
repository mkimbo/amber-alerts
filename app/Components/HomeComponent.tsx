"use client";
import React, { useState } from "react";
import { VscBroadcast } from "react-icons/vsc";
import styles from "./HomeComponent.module.scss";
import { MdKeyboardArrowRight, MdPersonSearch } from "react-icons/md";
import { AiFillCar } from "react-icons/ai";
import { RiMotorbikeFill } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
import { GrResources } from "react-icons/gr";
import Link from "next/link";
import { GiExplosiveMaterials } from "react-icons/gi";

// import { useLoadingCallback } from "react-loading-hook";
// import { Button } from "@/ui/button";

export default function HomeComponent() {
  return (
    <div className={styles.mainLinks}>
      <Link href="/alerts" className={styles.card}>
        <VscBroadcast className={styles.icon} color={"#ff4400"} fontSize={40} />
        <div className={styles.cardRight}>
          <div className={styles.info}>
            <span className={styles.title}>New Alert</span>
            <div className={styles.description}>
              Broadcast alert to nearby users
            </div>
          </div>
          <MdKeyboardArrowRight fontSize={35} className={styles.arrow} />
        </div>
      </Link>
      <Link href="/persons" className={styles.card}>
        <MdPersonSearch
          className={styles.icon}
          color={"#ff4400"}
          fontSize={40}
        />
        <div className={styles.cardRight}>
          <div className={styles.info}>
            <span className={styles.title}>Missing Persons</span>
            <div className={styles.description}>
              View list of missing persons
            </div>
          </div>
          <MdKeyboardArrowRight fontSize={35} className={styles.arrow} />
        </div>
      </Link>
      <Link href="/vehicles" className={styles.card}>
        <AiFillCar className={styles.icon} color={"#ff4400"} fontSize={40} />
        <div className={styles.cardRight}>
          <div className={styles.info}>
            <span className={styles.title}>Missing Vehicles</span>
            <div className={styles.description}>
              View list of missing vehicles
            </div>
          </div>
          <MdKeyboardArrowRight fontSize={35} className={styles.arrow} />
        </div>
      </Link>
      <Link href="/bikes" className={styles.card}>
        <RiMotorbikeFill
          className={styles.icon}
          color={"#ff4400"}
          fontSize={40}
        />
        <div className={styles.cardRight}>
          <div className={styles.info}>
            <span className={styles.title}>Missing Bikes</span>
            <div className={styles.description}>View list of missing bikes</div>
          </div>
          <MdKeyboardArrowRight fontSize={35} className={styles.arrow} />
        </div>
      </Link>
      <Link href="/resources" className={styles.card}>
        <GiExplosiveMaterials
          className={styles.icon}
          color={"#ff4400"}
          fontSize={40}
        />
        <div className={styles.cardRight}>
          <div className={styles.info}>
            <span className={styles.title}>Public Information</span>
            <div className={styles.description}>Safety, Health etc</div>
          </div>
          <MdKeyboardArrowRight fontSize={35} className={styles.arrow} />
        </div>
      </Link>
      <Link href="/about" className={styles.card}>
        <BsInfoCircle className={styles.icon} color={"#ff4400"} fontSize={40} />
        <div className={styles.cardRight}>
          <div className={styles.info}>
            <span className={styles.title}>About MissingLink</span>
            <div className={styles.description}>Learn More</div>
          </div>
          <MdKeyboardArrowRight fontSize={35} className={styles.arrow} />
        </div>
      </Link>
    </div>
  );
}
