"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";

import Fuse from "fuse.js";
import { TMotor } from "@/models/misssing_motor.model";
import BikeCard from "./BikeCard";

type BikeListProps = {
  bikeList: TMotor[];
};

const fuseOptions = {
  keys: [
    "lastSeenLocation",
    "licencePlate",
    "formattedAddress",
    // "model",
    "longAddress",
    "make",
  ],
  threshold: 0.3,
};

export default function BikeList({ bikeList }: BikeListProps) {
  const [filteredBikeList, setFilteredBikeList] = useState<TMotor[]>(bikeList);
  const fuse = new Fuse(bikeList, fuseOptions);

  const handleSearch = (searchString: string) => {
    if (searchString === "") {
      setFilteredBikeList(bikeList);
      return;
    }
    const results = fuse.search(searchString).map(({ item }) => item);
    setFilteredBikeList(results);
  };

  return (
    <>
      {filteredBikeList.length > 0 && (
        <div className={styles.header}>
          <input
            id={"searchString"}
            autoComplete={"off"}
            name={"searchString"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleSearch(e.target.value);
            }}
            className={styles.searchInput}
            placeholder={"Search by make or licence plate"}
          />
        </div>
      )}

      <div id="scrollableDiv" className={styles.listContainer}>
        {filteredBikeList.map((item) => (
          <BikeCard bike={item} key={item.id} />
        ))}
        {filteredBikeList.length === 0 && (
          <div className={styles.noResult}>
            <p>0 Bikes found</p>
          </div>
        )}
      </div>
    </>
  );
}
