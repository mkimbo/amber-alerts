"use client";
/* globals window */
import React, { useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";
import classNames from "classnames";

import {
  MdAddAlert,
  MdPersonSearch,
  MdAccountCircle,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import { AiFillCar } from "react-icons/ai";
import { LogoIcon } from "../../ui/icons";
import { useRouter } from "next/navigation";
import NotificationsHandler from "./NotificationsHandler";
import { useAuth } from "@/auth/hooks";
import { AuthProvider } from "@/auth/client-auth-provider";

export function Navbar() {
  const [navActive, setNavActive] = useState(false);
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(3);
  const { tenant } = useAuth();

  const navMenuListClasses = classNames(styles.navMenuList, {
    [styles.navMenuListActive]: navActive,
  });

  type TNavLink = {
    text: string;
    href: string;
    active?: boolean;
    icon: React.ReactElement;
  };

  const navLinks: TNavLink[] = [
    {
      text: "New Alert",
      href: "/alerts",
      icon: <MdAddAlert color={"#ff4400"} fontSize={26} />,
    },
    {
      text: "Persons",
      href: "/persons",
      icon: <MdPersonSearch color={"#ff4400"} fontSize={26} />,
    },
    {
      text: "Vehicles",
      href: "/vehicles",
      icon: <AiFillCar color={"#ff4400"} fontSize={26} />,
    },
    {
      text: "Bikes",
      href: "/bikes",
      icon: <RiMotorbikeFill color={"#ff4400"} fontSize={26} />,
    },
    {
      text: "Profile",
      href: "/profile",
      icon: <MdAccountCircle color={"#ff4400"} fontSize={26} />,
    },
  ];
  const NavItem = (item: TNavLink) => {
    return (
      <div className={styles.navItem} onClick={() => router.push(item.href)}>
        <span className={styles.navIcon}>{item.icon}</span>
        <span
          className={classNames(styles.navLink, {
            [styles.navLinkActive]: item.active,
          })}
        >
          {item.text}
        </span>
      </div>
    );
  };

  return (
    <header className={styles.navContainer}>
      <nav className={styles.navBar}>
        <Link href={"/"}>
          <div
            className={styles.logo}
            onClick={() => {
              setActiveIdx(3);
              setNavActive(false);
            }}
          >
            <LogoIcon />
          </div>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={styles.navMenuBar}
        >
          {navActive ? (
            <MdClose color={"#ff4400"} fontSize={30} />
          ) : (
            <MdMenu color={"#ff4400"} fontSize={30} />
          )}
        </div>
        <div className={navMenuListClasses}>
          {navLinks.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
      {tenant && !tenant.isAnonymous && (
        <AuthProvider defaultTenant={tenant}>
          <NotificationsHandler activeIdx={activeIdx} />
        </AuthProvider>
      )}
    </header>
  );
}
