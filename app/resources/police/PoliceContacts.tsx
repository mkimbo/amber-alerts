"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import policeInfo from "../../../public/pStations.json";
import Fuse from "fuse.js";
import ContactCard from "./ContactCard";
import Breadcrumbs from "@/app/Components/BreadCrumbs";

export type PoliceContact = {
  name: string;
  tel: string;
  tel2?: string;
  tel3?: string;
};

const fuseOptions = {
  keys: ["name"],
  threshold: 0.3,
};

export default function PoliceContacts() {
  const stations = Array.from(policeInfo)
    // .filter((item) => item.label.includes("Police Station"))
    .map((item) => {
      return {
        name: item.label,
        tel: item.Tel,
        tel2: item.Tel2,
        tel3: item.Tel3,
      };
    })
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1; // a should come before b
      }
      if (nameA > nameB) {
        return 1; // a should come after b
      }
      return 0; // a and b are equal in terms of sorting
    });
  const [filteredPoliceList, setFilteredPoliceList] =
    useState<PoliceContact[]>(stations);
  const fuse = new Fuse(stations, fuseOptions);

  const handleSearch = (searchString: string) => {
    if (searchString === "") {
      setFilteredPoliceList(stations);
      return;
    }
    const results = fuse.search(searchString).map(({ item }) => item);
    setFilteredPoliceList(results);
  };

  return (
    <>
      <Breadcrumbs />
      <div className={styles.header}>
        <input
          id={"searchString"}
          autoComplete={"off"}
          name={"searchString"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSearch(e.target.value);
          }}
          className={styles.searchInput}
          placeholder={"Search"}
        />
      </div>

      <div id="scrollableDiv" className={styles.listContainer}>
        {/* <Button loading={isLoading} onClick={handleFetch}>
          Fetch
        </Button> */}
        {filteredPoliceList.map((item) => (
          <ContactCard police={item} key={item.tel} />
        ))}
        {filteredPoliceList.length === 0 && (
          <div className={styles.noResult}>
            <p>No results found</p>
          </div>
        )}
      </div>
    </>
  );
}
