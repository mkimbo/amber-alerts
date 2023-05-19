"use client";
/* globals window */
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { getFCMToken, getOnMessage } from "@/auth/firebase";
import { clientConfig } from "@/config/client-config";
import { useAuth } from "@/auth/hooks";
import useFCMToken from "../Hooks/useFCMToken";
import { getMessaging, onMessage } from "firebase/messaging";
// initialise FCM and receive message when app is open
//import { initFCM } from "./utils/fcm";
//initFCM();
export function Navbar() {
  const [navActive, setNavActive] = useState(false);
  const { tenant } = useAuth();
  const { token, loading, error } = useFCMToken(clientConfig);
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(3);

  // useEffect(() => {
  //   if (!tenant) return;
  //   const enabledNotifications = Notification.permission === "granted";
  //   console.log("permission check in Navbar", enabledNotifications);
  //   if (!enabledNotifications) return;
  //   getOnMessage(clientConfig);
  // }, [tenant, token]);

  useEffect(() => {
    const enabledNotifications = Notification.permission === "granted";
    if (!enabledNotifications) return;
    setToken();
    async function setToken() {
      try {
        const token = await getFCMToken(clientConfig);
        if (token) {
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
    function getMessage() {
      const messaging = getMessaging();
      console.log({ messaging });
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        const body = JSON.parse(payload.notification?.body!);
        const title = JSON.parse(payload.notification?.title!);
        var options = {
          body,
        };
        //new self.registration.showNotification(title,options)
        new self.Notification(title, options);
        // ...
      });
    }
  });

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
    </header>
  );
}
