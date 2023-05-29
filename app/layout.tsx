import {
  ServerAuthProvider,
  getTenantFromCookies,
} from "@/auth/server-auth-provider";
import { Navbar } from "./Components/Navbar";
import ToastProvider from "./Components/ToastProvider";
import "./globals.scss";
import styles from "./layout.module.scss";
import { serverDB } from "@/utils/firebase";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { AuthProvider } from "@/auth/client-auth-provider";
import { Metadata } from "next";

// add next js 13 meta data

export const metadata: Metadata = {
  metadataBase: new URL("https://amber-alerts.vercel.app/"),
  title: {
    default: "Missing Link",
    template: "%s | Missing Link",
  },
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
  icons: {
    shortcut: "/favicon.ico",
  },
  // verification: {
  //   google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
  //   yandex: '14d2e73487fa6c71',
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const tenant = await getProfileData();
  return (
    <html lang="en">
      <head />
      <body style={{ overflowY: "hidden" }}>
        {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
        <AuthProvider>
          <Suspense>
            <Navbar />
            <ToastProvider />
          </Suspense>
        </AuthProvider>
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
