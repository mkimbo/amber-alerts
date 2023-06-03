//import type { Metadata } from "next";
import { Navbar } from "./Components/Navbar";
import ToastProvider from "./Components/ToastProvider";
import "./globals.scss";
import styles from "./layout.module.scss";
import { Suspense } from "react";

// add next js 13 meta data

// export const metadata: Metadata = {
// title: "Missing Link",
// openGraph: {
//   title: 'Next.js',
//   description: 'The React Framework for the Web',
//   url: 'https://nextjs.org',
//   siteName: 'Next.js',
//   images: [
//     {
//       url: 'https://nextjs.org/og.png',
//       width: 800,
//       height: 600,
//     },
//     {
//       url: 'https://nextjs.org/og-alt.png',
//       width: 1800,
//       height: 1600,
//       alt: 'My custom alt',
//     },
//   ],
//   locale: 'en_US',
//   type: 'website',
// },
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
