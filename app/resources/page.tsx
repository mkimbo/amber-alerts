import { Metadata } from "next";
import styles from "./page.module.scss";
import { ServerAuthProvider } from "@/auth/server-auth-provider";
import Link from "next/link";
import {
  MdEmergency,
  MdHealthAndSafety,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { GiPoliceBadge } from "react-icons/gi";
import { AiFillSafetyCertificate, AiOutlineSafety } from "react-icons/ai";
//import HomeComponent from "./Components/HomeComponent";
// export async function generateStaticParams() {
//   return [{}];
// }
export const metadata: Metadata = {
  title: "Resources",
};
export default function Resources() {
  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <Link href="/resources/police" className={styles.card}>
          <GiPoliceBadge
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Police Contacts</span>
              <div className={styles.description}>
                Police stations and their contacts
              </div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        {/* <Link href="/resources/emergency" className={styles.card}>
          <MdEmergency
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Emergency Contacts</span>
              <div className={styles.description}>Helplines & Hotlines</div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link> */}
        <Link href="/resources/health" className={styles.card}>
          <MdHealthAndSafety
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Health & Wellness Tips</span>
              <div className={styles.description}>Personal, mental etc</div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        <Link href="/resources/safety" className={styles.card}>
          <AiFillSafetyCertificate
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Safety Tips</span>
              <div className={styles.description}>Proactive over reactive</div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        <Link href="/resources/awareness" className={styles.card}>
          <AiFillSafetyCertificate
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Awareness Info</span>
              <div className={styles.description}>Proactive over reactive</div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
      </div>
    </div>
  );
}
