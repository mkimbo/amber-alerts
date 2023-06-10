"use client";
import React, { useState } from "react";
import { VscBroadcast } from "react-icons/vsc";
import styles from "./HomeComponent.module.scss";
import { MdPersonSearch } from "react-icons/md";
import { AiFillCar } from "react-icons/ai";
import { RiMotorbikeFill } from "react-icons/ri";

// import { useLoadingCallback } from "react-loading-hook";
// import { Button } from "@/ui/button";

export default function HomeComponent() {
  return (
    <>
      <div className={styles.card}>
        <VscBroadcast className={styles.icon} color={"#ff4400"} fontSize={40} />
        <div className={styles.cardRight}>
          <span className={styles.title}>New Alert</span>
          <div className={styles.description}>pgjdfhjfgdhjfglhjgflhfl</div>
        </div>
      </div>
      <div className={styles.card}>
        <MdPersonSearch
          className={styles.icon}
          color={"#ff4400"}
          fontSize={40}
        />
        <div className={styles.cardRight}>
          <span className={styles.title}>Missing Persons</span>
          <div className={styles.description}>pgjdfhjfgdhjfglhjgflhfl</div>
        </div>
      </div>
      <div className={styles.card}>
        <AiFillCar className={styles.icon} color={"#ff4400"} fontSize={40} />
        <div className={styles.cardRight}>
          <span className={styles.title}>Missing Vehicles</span>
          <div className={styles.description}>pgjdfhjfgdhjfglhjgflhfl</div>
        </div>
      </div>
      <div className={styles.card}>
        <RiMotorbikeFill
          className={styles.icon}
          color={"#ff4400"}
          fontSize={40}
        />
        <div className={styles.cardRight}>
          <span className={styles.title}>Missing Bikes</span>
          <div className={styles.description}>pgjdfhjfgdhjfglhjgflhfl</div>
        </div>
      </div>
    </>
  );
}
