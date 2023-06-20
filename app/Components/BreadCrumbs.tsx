"use client";
import styles from "./breadCrumbs.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = pathname?.split("/").filter((crumb) => crumb);

  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs?.map((crumb, index) => (
        <div key={index}>
          <Link href={`/${breadcrumbs?.slice(0, index + 1).join("/")}`}>
            <span
              className={
                index === breadcrumbs.length - 1
                  ? styles.current
                  : styles.normal
              }
            >
              {crumb}
            </span>
          </Link>
          {index !== breadcrumbs?.length - 1 && (
            <span className={styles.separator}>/</span>
          )}
        </div>
      ))}
    </div>
  );
}
