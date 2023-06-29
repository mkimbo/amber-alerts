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
import { GiExplosiveMaterials } from "react-icons/gi";

export function Navbar() {
  const [navActive, setNavActive] = useState(false);
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState("");
  const { tenant } = useAuth();

  const navMenuListClasses = classNames(styles.navMenuList, {
    [styles.navMenuListActive]: navActive,
  });

  type TNavLink = {
    text: string;
    href: string;
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
      text: "Resources",
      href: "/resources",
      icon: <GiExplosiveMaterials color={"#ff4400"} fontSize={26} />,
    },
    {
      text: "Profile",
      href: "/profile",
      icon: <MdAccountCircle color={"#ff4400"} fontSize={26} />,
    },
  ];
  const NavItem = ({
    item,
    idx,
    active,
  }: {
    item: TNavLink;
    idx: number;
    active: boolean;
  }) => {
    return (
      <Link
        onClick={() => {
          setActiveIdx(item.href);
          setNavActive(false);
        }}
        className={styles.navItem}
        href={item.href}
      >
        <span className={styles.navIcon}>{item.icon}</span>
        <span
          className={classNames(styles.navLink, {
            [styles.navLinkActive]: active,
          })}
        >
          {item.text}
        </span>
      </Link>
    );
  };

  return (
    <header className={styles.navContainer}>
      <nav className={styles.navBar}>
        <Link
          href={"/"}
          onClick={() => {
            setActiveIdx("");
            setNavActive(false);
          }}
        >
          <div className={styles.logo}>
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
            <NavItem
              key={menu.text}
              active={activeIdx.includes(menu.href)}
              idx={idx}
              item={menu}
            />
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
