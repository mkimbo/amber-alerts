"use client";
import React, { useState } from "react";
import { VscBroadcast } from "react-icons/vsc";
import styles from "./landingInfo.module.scss";
import Link from "next/link";

// import { useLoadingCallback } from "react-loading-hook";
// import { Button } from "@/ui/button";

export default function LandingInfo() {
  return (
    <>
      <h2 className={styles.title}>
        Welcome to <span>MissingLink</span>
      </h2>
      <VscBroadcast className={styles.icon} color={"#ff4400"} fontSize={80} />
      <div className={styles.description}>A Community Alerts Service</div>
      <div className={styles.about}>
        Enhancing public safety by facilitating rapid and reliable communication
        within the community.{" "}
        <Link href="/about" className={styles.linkText}>
          Learn more
        </Link>
      </div>
    </>
  );
}
