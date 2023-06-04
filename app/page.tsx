import { Metadata } from "next";
import styles from "./page.module.scss";
import { VscBroadcast } from "react-icons/vsc";
// export async function generateStaticParams() {
//   return [{}];
// }
export const metadata: Metadata = {
  title: "Home",
};
export default function Home() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Welcome to <span>MissingLink</span>
      </h2>
      <p className={styles.description}>A Missing Person Alert Service</p>
      <div className={styles.card}>
        <VscBroadcast className={styles.icon} color={"#ff4400"} fontSize={80} />
        <p className={styles.about}>
          Broadcast a missing person alert to the public and get help from the
          community to find your loved one. Mapema Ndio Best!
        </p>
      </div>
    </div>
  );
}
