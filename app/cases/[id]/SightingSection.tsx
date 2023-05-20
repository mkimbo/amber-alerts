"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import { TPerson } from "@/models/missing_person.model";
import { FcCalendar } from "react-icons/fc";
import { MdOutlineLocationOn } from "react-icons/md";
import { format } from "date-fns";
import { useAuth } from "@/auth/hooks";

type Props = {
  data: TPerson;
};

export default function PersonSightings({ data }: Props) {
  const { tenant } = useAuth();
  return <></>;
}
