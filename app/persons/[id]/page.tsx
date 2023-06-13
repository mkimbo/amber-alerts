import type { Metadata } from "next";
import styles from "./page.module.scss";
import sampleMissing from "../../../public/missing-person.webp";
import { placeholderUrl } from "../../../utils/constants";
import Image from "next/image";
import { format } from "date-fns";
import { getTenantFromCookies } from "@/auth/server-auth-provider";
import { cookies } from "next/headers";
import { FcCalendar } from "react-icons/fc";
import { MdOutlineLocationOn } from "react-icons/md";
import { serverDB } from "@/utils/firebase";
import { TPerson } from "@/models/missing_person.model";
import NewSightingButton from "@/app/Components/SightingButton";
import SocialShareButtons from "@/app/Components/SocialShare";
import MarkAsFoundButton from "@/app/Components/MarkAsFoundButton";

// export async function generateStaticParams() {
//   const data = await getMissingPersonList();
//   const paths = data.map((person) => {
//     return {
//       params: { id: person.id! },
//     };
//   });
//   return paths;
// }
export const revalidate = 0;

async function getMissingPersonById(personId: string): Promise<TPerson | null> {
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

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  if (!params.id) {
    throw new Error("No personId provided");
  }

  const data = await getMissingPersonById(params.id);
  if (!data) {
    throw new Error("No person found with that id");
  }

  const { fullname, lastSeenDescription, lastSeenDate, images, found } = data;
  const ogImage = images[0];

  return {
    title: found ? fullname : fullname,
    description: lastSeenDescription,
    // metadataBase: new URL("https://amber-alerts.vercel.app"),
    alternates: {
      canonical: `https://amber-alerts.vercel.app/persons/${params.id}`,
    },
    openGraph: {
      title: fullname + " is missing",
      description: lastSeenDescription,
      type: "article",
      publishedTime: lastSeenDate,
      url: `https://amber-alerts.vercel.app/persons/${params.id}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullname + " is missing",
      description: lastSeenDescription,
      images: [ogImage],
    },
    // robots: {
    //   index: true,
    //   follow: true,
    //   googleBot: {
    //     index: true,
    //     follow: true,
    //     "max-video-preview": -1,
    //     "max-image-preview": "large",
    //     "max-snippet": -1,
    //   },
    // },
    verification: {
      google: "VaD1qjKK95G1B1wsA3ZydoAdSg2r3aCm6D7ZJw2bw",
    },
  } as Metadata;
}

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
        {tenant?.id != data?.createdBy && (
          <div className={styles.contacts}>
            <span>{`If you have any info please contact ${
              data?.secondaryContact
            }${
              tenant?.email && ` or ${tenant?.email}`
            }. You can also report to the nearest police station or directly on this platform by clicking the button below.`}</span>
            <NewSightingButton
              type="person"
              found={data?.found}
              itemId={params.id!}
            />
          </div>
        )}
        {tenant?.id === data?.createdBy && (
          <>
            <SocialShareButtons
              url={`https://amber-alerts.vercel.app/persons/${params.id}`}
              title={data?.fullname!}
              description={data?.lastSeenDescription!}
            />
            <div className={styles.buttonGroup}>
              <MarkAsFoundButton
                type="person"
                found={data?.found}
                itemId={params.id!}
              />
            </div>
          </>
        )}

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
                <div className={styles.noResult}>
                  <span> None Yet</span>
                  If someone reports sighting your loved one, you will receive a
                  notification and from here you can see where and when.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
