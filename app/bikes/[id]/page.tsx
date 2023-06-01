import styles from "./page.module.scss";
import sampleMissing from "../../../public/missing-person.webp";
import { placeholderUrl } from "../../../utils/constants";
import Image from "next/image";
import { format } from "date-fns";
import NewSightingButton from "../../Components/SightingButton";
import { getTenantFromCookies } from "@/auth/server-auth-provider";
import { cookies } from "next/headers";
import { FcCalendar } from "react-icons/fc";
import { MdOutlineLocationOn } from "react-icons/md";
import { serverDB } from "@/utils/firebase";
import { TMotor } from "@/models/misssing_motor.model";
import { Metadata } from "next";
import { Button } from "@/ui/button";
import SocialShareButtons from "@/app/Components/SocialShare";

async function getMissingBikeById(bikeId: string): Promise<TMotor | null> {
  const missingBike = await serverDB
    .collection("missing_motors")
    .doc(bikeId)
    .get();
  if (!missingBike.exists) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("No bike found with that id");
  }
  return missingBike.data() as TMotor;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | undefined> {
  if (!params.id) {
    throw new Error("No bike Id provided");
  }

  const data = await getMissingBikeById(params.id);
  if (!data) {
    return;
  }

  const { model, lastSeenDescription, lastSeenDate, images, make, year } = data;
  const ogImage = images[0];

  return {
    title: model + " " + make,
    description: lastSeenDescription,
    alternates: {
      canonical: `/bikes/${params.id}`,
    },
    openGraph: {
      title: model + " " + make,
      description: lastSeenDescription,
      type: "article",
      siteName: "Missing Link",
      publishedTime: lastSeenDate,
      url: `https://amber-alerts.vercel.app/bikes/${params.id}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: model + " " + make,
      description: lastSeenDescription,
      images: [ogImage],
    },
  };
}

export default async function MissingBike({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    throw new Error("No bikeId provided");
  }

  const bike = await getMissingBikeById(params.id);
  const tenant = await getTenantFromCookies(cookies);

  if (!bike) {
    throw new Error("No bike found with that id");
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Missing Bike</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.personalInfo}>
          <Image
            className={styles.image}
            src={bike.images!.length! > 0 ? bike.images[0]! : sampleMissing}
            alt={bike.licencePlate + " image"}
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL={placeholderUrl}
          />
          <div className={styles.info}>
            <span className={styles.name}>{` ${bike.make} ${bike.model}`}</span>
            <span className={styles.infoLabel}>
              Year: <span>{bike.year}</span>
            </span>
            <span className={styles.infoLabel}>
              Color: <span>{bike.color}</span>
            </span>

            <span className={styles.locationLabel}>Last seen on</span>
            <span className={styles.infoLabel}>
              {format(new Date(bike.lastSeenDate!), "do MMM yyyy")}
            </span>
            <span className={styles.locationLabel}>Location</span>
            <span className={styles.infoLabel}>{bike.lastSeenLocation}</span>
            <span className={styles.infoLabel}>
              {bike.county ? bike.county : bike.formattedAddress}
            </span>
          </div>
        </div>
        <div className={styles.description}>{bike.lastSeenDescription}</div>

        {tenant?.id != bike?.createdBy && (
          <div className={styles.contacts}>
            <span>{`If you have any info please contact ${
              bike?.secondaryContact
            }${
              tenant?.email && ` or ${tenant?.email}`
            }. You can also report to the nearest police station or directly on this platform by clicking the button below.`}</span>
            <NewSightingButton
              found={bike.found}
              itemId={params.id!}
              type="motor"
            />
          </div>
        )}
        {tenant?.id === bike?.createdBy && (
          <>
            <SocialShareButtons
              url={`https://amber-alerts.vercel.app/bikes/${params.id}`}
              title={`${bike.make} ${bike.model}`}
              description={bike?.lastSeenDescription!}
            />
            <div className={styles.buttonGroup}>
              <Button
              //loading={isLogoutLoading}
              //disabled={isLogoutLoading}
              //onClick={handleLogout}
              >
                Mark as Found
              </Button>
            </div>
          </>
        )}
        {tenant?.id === bike.createdBy && (
          <>
            <div className={styles.sightingsSection}>
              <h3 className={styles.title}>Recent sightings</h3>
            </div>
            <div className={styles.sightings}>
              <div className={styles.listContainer}>
                {bike.sightings?.map((sighting) => (
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
              {(!bike.sightings || bike.sightings?.length === 0) && (
                <div className={styles.noResult}>None Yet</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
