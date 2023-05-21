"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import { TPerson, TSaveNotification } from "../../models/missing_person.model";
import Fuse from "fuse.js";
// import { useLoadingCallback } from "react-loading-hook";
// import { Button } from "@/ui/button";

type PersonCardProps = {
  notificationsList: TSaveNotification[];
};

export default function NotificationList({
  notificationsList,
}: PersonCardProps) {
  // const [filteredPersonList, setFilteredPersonList] =
  //   useState<TPerson[]>(personList);

  // const [handleFetch, isLoading] = useLoadingCallback(async () => {
  //   const res = await fetch("api/cases", {
  //     method: "GET",
  //   });
  //   const data = await res.json();
  //   //setFilteredPersonList(Array.from(data));
  //   console.log(data, "data");
  // });

  return (
    <>
      <div className={styles.header}>Notifications tabs</div>

      <div id="scrollableDiv" className={styles.listContainer}>
        <div className={styles.noResult}>
          <p>No results found</p>
        </div>
      </div>
    </>
  );
}
