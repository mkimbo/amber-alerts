import { Metadata } from "next";
import styles from "./page.module.scss";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GiPoliceBadge } from "react-icons/gi";
import Breadcrumbs from "@/app/Components/BreadCrumbs";
//import HomeComponent from "./Components/HomeComponent";
// export async function generateStaticParams() {
//   return [{}];
// }
export const metadata: Metadata = {
  title: "Safety Information",
  description: "Safety Tips, Guidelines and Measures",
};
export default function SafetyResources() {
  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <div className={styles.cardWrapper}>
        <Link href="/resources/safety/personal" className={styles.card}>
          <GiPoliceBadge
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Personal Safety</span>
              <div className={styles.description}>Safety starts with you</div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        <Link href="/resources/safety/online" className={styles.card}>
          <GiPoliceBadge
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Online Safety</span>
              <div className={styles.description}>
                Stay informed on best practices
              </div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        <Link href="/resources/safety/children" className={styles.card}>
          <GiPoliceBadge
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Child Safety</span>
              <div className={styles.description}>
                This is a shared responsibility.
              </div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        <Link href="/resources/safety/sexual" className={styles.card}>
          <GiPoliceBadge
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
        <Link href="/resources/safety/fire" className={styles.card}>
          <GiPoliceBadge
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Fire Safety Tips</span>
              <div className={styles.description}>
                Be proactive in fire prevention.
              </div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
      </div>
    </div>
  );
}
