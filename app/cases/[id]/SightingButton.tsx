"use client";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

type Props = {
  personId: string;
};
import styles from "./page.module.scss";

export default function NewSightingButton({ personId }: Props) {
  // const router = useRouter();
  return (
    <Link href={`/new/sighting/${personId}`} className={styles.btnWrapper}>
      <span className={styles.btn}>
        Report Sighting <MdKeyboardArrowRight fontSize={30} />
      </span>
    </Link>
  );
}
