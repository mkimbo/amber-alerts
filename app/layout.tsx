import { Navbar } from "./Components/Navbar";
import ToastProvider from "./Components/ToastProvider";
import "./globals.scss";
import styles from "./layout.module.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body style={{ overflowY: "hidden" }}>
        <Navbar />
        <ToastProvider />
        <div className={styles.container}>
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>
            <span> Code </span>
            <a href="https://github.com/mkimbo/missing-link" target="_blank">
              @github
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
