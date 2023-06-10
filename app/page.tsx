import { Metadata } from "next";
import styles from "./page.module.scss";
import { VscBroadcast } from "react-icons/vsc";
import { ServerAuthProvider } from "@/auth/server-auth-provider";
import HomeComponent from "./Components/HomeComponent";
// export async function generateStaticParams() {
//   return [{}];
// }
export const metadata: Metadata = {
  title: "Home",
};
export default function Home() {
  return (
    <div className={styles.container}>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <HomeComponent />
      </ServerAuthProvider>
    </div>
  );
}
