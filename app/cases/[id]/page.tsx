import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../../auth/server-auth-provider";
import { serverDB } from "../../../utils/firebase";
import sampleMissing from "../../../public/missing-person.webp";
import { placeholderUrl } from "../../../utils/constants";
import { TPerson } from "../../../models/missing_person.model";
import Image from "next/image";
import { format } from "date-fns";
import NewSightingButton from "./SightingButton";

async function getMissingPersonData(personId: string): Promise<TPerson | null> {
  const missingPerson = await serverDB
    .collection("reported_missing")
    .doc(personId)
    .get();
  if (!missingPerson.exists) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("No person found with that id");
  }
  return missingPerson.data() as TPerson;
}

export default async function MissingPersonProfile({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    throw new Error("No personId provided");
  }

  const data = await getMissingPersonData(params.id);

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
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
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
          <div
            className={styles.contacts}
          >{`If you have any info please contact ${data?.secondaryContact}. You can also report to the nearest police station or directly on this platform by clicking the button below.`}</div>
          <NewSightingButton personId={params.id!} />
        </div>
      </ServerAuthProvider>
    </div>
  );
}
