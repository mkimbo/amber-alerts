import { Metadata } from "next";
import styles from "./page.module.scss";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { BsPeopleFill, BsPersonFillCheck } from "react-icons/bs";
import { RiMentalHealthFill } from "react-icons/ri";
import Breadcrumbs from "@/app/Components/BreadCrumbs";

export const metadata: Metadata = {
  title: "Awareness Information",
  description: "Stay Informed and Aware",
};
export default function AwarenessResources() {
  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <div className={styles.cardWrapper}>
        <Link href="/resources/awareness/financial" className={styles.card}>
          <BsPersonFillCheck
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Financial Literacy</span>
              <div className={styles.description}>
                A lifelong learning process
              </div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        <Link href="/resources/awareness/sexual" className={styles.card}>
          <RiMentalHealthFill
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Sexual harrassment and GBV</span>
              <div className={styles.description}>Awareness and prevention</div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        <Link href="#" className={styles.card}>
          <BsPeopleFill
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Environmental conservation</span>
              <div className={styles.description}>
                Contraceptives, safe sex etc
              </div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        <Link href="#" className={styles.card}>
          <GiTeacher className={styles.icon} color={"#ff4400"} fontSize={40} />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>CSE</span>
              <div className={styles.description}>
                tips for parents, teachers etc
              </div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
      </div>
    </div>
  );
}
