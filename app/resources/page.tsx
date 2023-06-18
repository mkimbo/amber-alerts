import { Metadata } from "next";
import styles from "./page.module.scss";
import { ServerAuthProvider } from "@/auth/server-auth-provider";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GiPoliceBadge } from "react-icons/gi";
//import HomeComponent from "./Components/HomeComponent";
// export async function generateStaticParams() {
//   return [{}];
// }
export const metadata: Metadata = {
  title: "Resources",
};
export default function Home() {
  return (
    <div className={styles.container}>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <Link href="/police" className={styles.card}>
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
        <Link href="/emergency" className={styles.card}>
          <GiPoliceBadge
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Emergency Contacts</span>
              <div className={styles.description}>Helplines</div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
        <Link href="/emergency" className={styles.card}>
          <GiPoliceBadge
            className={styles.icon}
            color={"#ff4400"}
            fontSize={40}
          />
          <div className={styles.cardRight}>
            <div className={styles.info}>
              <span className={styles.title}>Safety Tips</span>
              <div className={styles.description}>
                Public safety measures and guidelines
              </div>
            </div>
            <MdKeyboardArrowRight fontSize={35} />
          </div>
        </Link>
      </ServerAuthProvider>
    </div>
  );
}
