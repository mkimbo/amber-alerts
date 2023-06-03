import { Navbar } from "./Components/Navbar";
import ToastProvider from "./Components/ToastProvider";
import "./globals.scss";
import styles from "./layout.module.scss";
import { Suspense } from "react";
import { AuthProvider } from "@/auth/client-auth-provider";
import { Metadata } from "next";

// add next js 13 meta data

// export const metadata: Metadata = {
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   verification: {
//     google: "VaD1qjKK95G1B1wsA3ZydoAdSg2r3aCm6D7ZJw2bw",
//   },
// };

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
