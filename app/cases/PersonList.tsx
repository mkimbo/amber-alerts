"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import { TPerson } from "../../models/missing_person.model";
import PersonCard from "./PersonCard";
import Fuse from "fuse.js";

type PersonCardProps = {
  personList: TPerson[];
};

const fuseOptions = {
  keys: [
    "lastSeenLocation",
    "fullname",
    "formattedAddress",
    "othername",
    "longAddress",
  ],
  threshold: 0.3,
};

export default function PersonList({ personList }: PersonCardProps) {
  const [filteredPersonList, setFilteredPersonList] =
    useState<TPerson[]>(personList);
  const fuse = new Fuse(personList, fuseOptions);

  const handleSearch = (searchString: string) => {
    if (searchString === "") {
      setFilteredPersonList(personList);
      return;
    }
    const results = fuse.search(searchString).map(({ item }) => item);
    setFilteredPersonList(results);
  };

  return (
    <>
      <div className={styles.header}>
        <input
          id={"searchString"}
          autoComplete={"off"}
          name={"searchString"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSearch(e.target.value);
          }}
          className={styles.searchInput}
          placeholder={"Search by person name or location"}
        />
      </div>

      <div id="scrollableDiv" className={styles.listContainer}>
        {filteredPersonList.map((item) => (
          <PersonCard person={item} key={item.id} />
        ))}
        {filteredPersonList.length === 0 && (
          <div className={styles.noResult}>
            <p>No results found</p>
          </div>
        )}
      </div>
    </>
  );
}
