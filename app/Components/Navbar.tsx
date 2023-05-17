"use client";

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
import { LogoIcon } from "../../ui/icons";
export function Navbar() {
  const [navActive, setNavActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(3);
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
      href: "/new/alert",
      icon: <MdAddAlert color={"#ff4400"} fontSize={26} />,
    },
    {
      text: "Active Cases",
      href: "/cases",
      icon: <MdPersonSearch color={"#ff4400"} fontSize={26} />,
    },
    {
      text: "Profile",
      href: "/profile",
      icon: <MdAccountCircle color={"#ff4400"} fontSize={26} />,
    },
  ];
  const NavItem = (item: TNavLink) => {
    return (
      <Link className={styles.navItem} href={item.href}>
        <span className={styles.navIcon}>{item.icon}</span>
        <span
          className={classNames(styles.navLink, {
            [styles.navLinkActive]: item.active,
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
    </header>
  );
}
