import styles from "./page.module.scss";
import sampleMissing from "../../../public/missing-person.webp";
import { placeholderUrl } from "../../../utils/constants";
import Image from "next/image";
import { format } from "date-fns";
import NewSightingButton from "./SightingButton";
import { getMissingPersonById, getMissingPersonList } from "../getCases";
import PersonSightings from "./SightingSection";
import { getTenantFromCookies } from "@/auth/server-auth-provider";
import { cookies } from "next/headers";
import { FcCalendar } from "react-icons/fc";
import { MdOutlineLocationOn } from "react-icons/md";

// export async function generateStaticParams() {
//   const data = await getMissingPersonList();
//   const paths = data.map((person) => {
//     return {
//       params: { id: person.id! },
//     };
//   });
//   return paths;
// }

export default async function MissingPerson({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    throw new Error("No personId provided");
  }

  const data = await getMissingPersonById(params.id);
  const tenant = await getTenantFromCookies(cookies);

  function getGender(val: string): string {
    if (val === "M") {
      return "Male";
    }
    if (val === "F") {
      return "Female";
    }
    return "Other";
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Missing Person</h3>
      </div>
      <div className={styles.content}>
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
        {tenant?.id === data?.createdBy && (
          <>
            <div className={styles.sightingsSection}>
              <h3 className={styles.title}>Recent sightings</h3>
            </div>
            <div className={styles.sightings}>
              <div className={styles.listContainer}>
                {data?.sightings?.map((sighting) => (
                  <div key={sighting.sightingDate} className={styles.sighting}>
                    <div className={styles.sightingInfo}>
                      <FcCalendar
                        className={styles.icon}
                        color={"#ff4400"}
                        fontSize={20}
                      />
                      <span>
                        {format(new Date(sighting.sightingDate), "do MMM yyyy")}
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
      </div>
    </div>
  );
}
