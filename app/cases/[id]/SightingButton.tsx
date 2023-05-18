"use client";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiTick } from "react-icons/ti";
type Props = {
  personId: string;
  found?: boolean;
};
import styles from "./page.module.scss";
import { useAuth } from "@/auth/hooks";

export default function NewSightingButton({ personId, found }: Props) {
  const { tenant } = useAuth();
  return (
    <>
      {found ? (
        <div className={styles.btn}>
          <span className={styles.found}>Found</span>{" "}
          <TiTick fontSize={20} color={"#ff4400"} />
        </div>
      ) : (
        <Link href={`/new/sighting/${personId}`} className={styles.btn}>
          <span className={styles.report}>Report Sighting</span>{" "}
          <MdKeyboardArrowRight fontSize={25} />
        </Link>
      )}{" "}
    </>
  );
}
