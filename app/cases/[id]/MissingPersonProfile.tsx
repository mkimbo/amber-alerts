"use client";

import * as React from "react";
import styles from "./page.module.scss";

import { useLoadingCallback } from "react-loading-hook";
import { useAuth } from "../../../auth/hooks";
import { useFirebaseAuth } from "../../../auth/firebase";
import { clientConfig } from "../../../config/client-config";
import { useRouter, useSearchParams } from "next/navigation";
import sampleMissing from "../../../public/missing-person.webp";
import { placeholderUrl } from "../../../utils/constants";
import { TPerson } from "../../../models/missing_person.model";
import Image from "next/image";
import { format } from "date-fns";
import NewSightingButton from "./SightingButton";
import { MdOutlineLocationOn } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
//import { cookies } from "next/headers";
import { getMissingPersonById, getMissingPersonList } from "../getCases";
import { Suspense } from "react";
import { PageLoader } from "@/ui/icons";

// export async function generateStaticParams() {
//   // const data = await getMissingPersonList();
//   const res = await fetch("/api/cases", {
//     method: "GET",
//   });
//   const data = await res.json();
//   const paths = data.map((person: TPerson) => {
//     return {
//       params: { id: person.id! },
//     };
//   });
//   return paths;
// }

export default function MissingPersonProfile() {
  const { tenant } = useAuth();
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  // const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
  // const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
  //   await fetch("/api/logout", {
  //     method: "GET",
  //   });
  // });
  // React.useEffect(() => {
  //   const redirect = searchParams?.get("id");
  //   if (!redirect) {
  //     router.push("/search");
  //   }
  // }, []);

  if (!tenant) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Missing Person</h3>
          <div></div>
        </div>
        {/* <div className={styles.content}>
          <div className={styles.personalInfo}>
            <Image
              className={styles.image}
              src={data?.images!.length! > 0 ? data?.images[0]! : sampleMissing}
              alt={`${data?.fullname}`}
              width={500}
              height={500}
              placeholder="blur"
              blurDataURL={placeholderUrl}
            />
            <div className={styles.info}>
              <span className={styles.name}>{`${data?.fullname}${
                data?.othername && ` (${data?.othername})`
              }`}</span>
              <span className={styles.infoLabel}>
                Age: <span>{data?.age}</span>
              </span>
              <span className={styles.infoLabel}>
                Gender: <span>{getGender(data?.gender!)}</span>
              </span>
              <span className={styles.infoLabel}>
                Complexion: <span>{data?.complexion}</span>
              </span>
              <span className={styles.locationLabel}>Last seen on</span>
              <span className={styles.infoLabel}>
                {format(new Date(data?.lastSeenDate!), "do MMM yyyy")}
              </span>
              <span className={styles.locationLabel}>Location</span>
              <span className={styles.infoLabel}>{data?.lastSeenLocation}</span>
              <span className={styles.infoLabel}>
                {data?.county ? data?.county : data?.formattedAddress}
              </span>
            </div>
          </div>
          <div className={styles.description}>{data?.lastSeenDescription}</div>
          <div className={styles.contacts}>
            <span>{`If you have any info please contact ${data?.secondaryContact}. You can also report to the nearest police station or directly on this platform by clicking the button below.`}</span>
            <NewSightingButton found={data?.found} personId={params.id!} />
          </div>
          {data?.createdBy && (
            <>
              <div className={styles.sightingsSection}>
                <h3 className={styles.title}>Recent sightings</h3>
              </div>
              <div className={styles.sightings}>
                <div className={styles.listContainer}>
                  {data?.sightings?.map((sighting) => (
                    <div
                      key={sighting.sightingDate}
                      className={styles.sighting}
                    >
                      <div className={styles.sightingInfo}>
                        <FcCalendar
                          className={styles.icon}
                          color={"#ff4400"}
                          fontSize={20}
                        />
                        <span>
                          {format(
                            new Date(sighting.sightingDate),
                            "do MMM yyyy"
                          )}
                        </span>
                      </div>
                      <div className={styles.sightingInfo}>
                        <MdOutlineLocationOn
                          className={styles.icon}
                          color={"#ff4400"}
                          fontSize={20}
                        />
                        <span>{`${sighting.sightingLocation}, ${sighting.longAddress}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {(!data?.sightings || data?.sightings?.length === 0) && (
                  <div className={styles.noResult}>None Yet</div>
                )}
              </div>
            </>
          )}
        </div> */}
      </div>
    </>
  );
}
