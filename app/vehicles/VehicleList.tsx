"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import VehicleCard from "./VehicleCard";
import Fuse from "fuse.js";
import { TMotor } from "@/models/misssing_motor.model";

type VehicleListProps = {
  vehicleList: TMotor[];
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

export default function VehicleList({ vehicleList }: VehicleListProps) {
  const [filteredVehicleList, setFilteredVehicleList] =
    useState<TMotor[]>(vehicleList);
  const fuse = new Fuse(vehicleList, fuseOptions);

  const handleSearch = (searchString: string) => {
    if (searchString === "") {
      setFilteredVehicleList(vehicleList);
      return;
    }
    const results = fuse.search(searchString).map(({ item }) => item);
    setFilteredVehicleList(results);
  };

  return (
    <>
      {vehicleList.length > 0 && (
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
        {filteredVehicleList.map((item) => (
          <VehicleCard vehicle={item} key={item.id} />
        ))}
        {filteredVehicleList.length === 0 && (
          <div className={styles.noResult}>
            <p>No results found</p>
          </div>
        )}
      </div>
    </>
  );
}
