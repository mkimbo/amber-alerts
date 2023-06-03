import type { Metadata } from "next";
import styles from "./page.module.scss";
import { VscBroadcast } from "react-icons/vsc";
export async function generateStaticParams() {
  return [{}];
}

export const metadata: Metadata = {
  title: "Missing Link",
  description:
    "Proximity-based community alerts system for missing persons and vehicles",
  openGraph: {
    title: "Missing Link",
    description:
      "Proximity-based community alerts system for missing persons and vehicles",
    url: "https://amber-alerts.vercel.app/",
    siteName: "Missing Link",
    images: [
      {
        url: "https://leerob.io/og.jpg", // Replace this with your own image
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Missing Link",
    card: "summary_large_image",
  },
  // icons: {
  //   shortcut: "/favicon.ico",
  // },
  verification: {
    google: "VaD1qjKK95G1B1wsA3ZydoAdSg2r3aCm6D7ZJw2bw",
  },
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
