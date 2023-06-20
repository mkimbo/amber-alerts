import { Metadata } from "next";
import styles from "./page.module.scss";
import { ServerAuthProvider } from "@/auth/server-auth-provider";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GiPoliceBadge } from "react-icons/gi";
import Breadcrumbs from "@/app/Components/BreadCrumbs";
//import HomeComponent from "./Components/HomeComponent";
// export async function generateStaticParams() {
//   return [{}];
// }
export const metadata: Metadata = {
  title: "Health Information",
  description: "Health Tips, Guidelines and Measures",
};
export default function HealthResources() {
  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <div className={styles.cardWrapper}>
        <Link href="/resources/health/personal" className={styles.card}>
          <GiPoliceBadge
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Personal Wellness</span>
              <div className={styles.description}>Healthy tips</div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        <Link href="/resources/health/mental" className={styles.card}>
          <GiPoliceBadge
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Mental Health</span>
              <div className={styles.description}>
                Mind wellness, Meditation etc
              </div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        <Link href="/resources/health/sexual" className={styles.card}>
          <GiPoliceBadge
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Sexual Health</span>
              <div className={styles.description}>
                Contraceptives, safe sex etc
              </div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        <Link href="/resources/health/cse" className={styles.card}>
          <GiPoliceBadge
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
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
