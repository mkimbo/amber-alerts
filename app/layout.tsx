import type { Metadata } from "next";
import { Navbar } from "./Components/Navbar";
import ToastProvider from "./Components/ToastProvider";
import "./globals.scss";
import styles from "./layout.module.scss";
import { Suspense } from "react";

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
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     "max-video-preview": -1,
  //     "max-image-preview": "large",
  //     "max-snippet": -1,
  //   },
  // },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const tenant = await getProfileData();
  return (
    <html lang="en">
      <body style={{ overflowY: "hidden" }}>
        <Suspense>
          <Navbar />
          <ToastProvider />
        </Suspense>
        <div className={styles.container}>
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>
            <span> Code </span>
            <a href="https://github.com/mkimbo/amber-alerts" target="_blank">
              @github
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
