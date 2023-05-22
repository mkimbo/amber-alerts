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

// async function getProfileData() {
//   const tenant = await getTenantFromCookies(cookies);
//   if (!tenant) {
//     return null;
//   }
//   return tenant;
// }

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
