import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
//import { VerifyForm } from "./VerifyForm";

export default function Alerts() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Alerts</h2>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <div>
          By reporting alerts promptly, you become an essential part of the
          community's effort to locate and reunite loved ones or recover stolen
          property. Your accurate and detailed information can make a
          significant difference in the search and recovery process.{" "}
        </div>
        <Link href={`/new/alert?type=person`} className={styles.btn}>
          <span className={styles.report}>Missing Person</span>{" "}
          <MdKeyboardArrowRight fontSize={25} />
        </Link>
        <Link href={`/new/alert?type=motor`} className={styles.btn}>
          <span className={styles.report}>Missing Vehicle/Bike</span>{" "}
          <MdKeyboardArrowRight fontSize={25} />
        </Link>
      </ServerAuthProvider>
    </div>
  );
}
