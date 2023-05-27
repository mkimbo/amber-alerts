"use client";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiTick } from "react-icons/ti";
type Props = {
  itemId: string;
  found?: boolean;
  type: "person" | "motor";
};
import styles from "./sightingButton.module.scss";

export default function NewSightingButton({ itemId, found, type }: Props) {
  return (
    <>
      {found ? (
        <div className={styles.btn}>
          <span className={styles.found}>Found</span>{" "}
          <TiTick fontSize={20} color={"#ff4400"} />
        </div>
      ) : (
        <Link
          href={`/new/sighting/${itemId}?type=${type}`}
          className={styles.btn}
        >
          <span className={styles.report}>Report Sighting</span>{" "}
          <MdKeyboardArrowRight fontSize={25} />
        </Link>
      )}{" "}
    </>
  );
}
