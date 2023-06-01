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

async function getMissingVehicleById(
  vehicleId: string
): Promise<TMotor | null> {
  const missingVehicle = await serverDB
    .collection("missing_motors")
    .doc(vehicleId)
    .get();
  if (!missingVehicle.exists) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("No vehicle found with that id");
  }
  return missingVehicle.data() as TMotor;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | undefined> {
  if (!params.id) {
    throw new Error("No vehicle Id provided");
  }

  const data = await getMissingVehicleById(params.id);
  if (!data) {
    return;
  }

  const { model, lastSeenDescription, lastSeenDate, images, make, year } = data;
  const ogImage = images[0];

  return {
    title: make + " " + model,
    description: lastSeenDescription,
    alternates: {
      canonical: `/vehicles/${params.id}`,
    },
    openGraph: {
      title: make + " " + model,
      description: lastSeenDescription,
      type: "article",
      publishedTime: lastSeenDate,
      url: `https://amber-alerts.vercel.app/vehicles/${params.id}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      title: make + " " + model,
      card: "summary_large_image",
      description: lastSeenDescription,
      images: [ogImage],
    },
  };
}

export default async function MissingVehicle({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    throw new Error("No personId provided");
  }

  const vehicle = await getMissingVehicleById(params.id);
  const tenant = await getTenantFromCookies(cookies);

  if (!vehicle) {
    throw new Error("No vehicle found with that id");
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Missing Vehicle</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.personalInfo}>
          <Image
            className={styles.image}
            src={
              vehicle.images!.length! > 0 ? vehicle.images[0]! : sampleMissing
            }
            alt={vehicle.licencePlate + " image"}
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL={placeholderUrl}
          />
          <div className={styles.info}>
            <span
              className={styles.name}
            >{` ${vehicle.make} ${vehicle.model}`}</span>
            <span className={styles.infoLabel}>
              Year: <span>{vehicle.year}</span>
            </span>
            <span className={styles.infoLabel}>
              Color: <span>{vehicle.color}</span>
            </span>

            <span className={styles.locationLabel}>Last seen on</span>
            <span className={styles.infoLabel}>
              {format(new Date(vehicle.lastSeenDate!), "do MMM yyyy")}
            </span>
            <span className={styles.locationLabel}>Location</span>
            <span className={styles.infoLabel}>{vehicle.lastSeenLocation}</span>
            <span className={styles.infoLabel}>
              {vehicle.county ? vehicle.county : vehicle.formattedAddress}
            </span>
          </div>
        </div>
        <div className={styles.description}>{vehicle.lastSeenDescription}</div>

        {tenant?.id != vehicle?.createdBy && (
          <div className={styles.contacts}>
            <span>{`If you have any info please contact ${
              vehicle?.secondaryContact
            }${
              tenant?.email && ` or ${tenant?.email}`
            }. You can also report to the nearest police station or directly on this platform by clicking the button below.`}</span>
            <NewSightingButton
              found={vehicle.found}
              itemId={params.id!}
              type="motor"
            />
          </div>
        )}
        {tenant?.id === vehicle?.createdBy && (
          <>
            <SocialShareButtons
              url={`https://amber-alerts.vercel.app/vehicles/${params.id}`}
              title={`${vehicle.make} ${vehicle.model}`}
              description={vehicle?.lastSeenDescription!}
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
        {tenant?.id === vehicle.createdBy && (
          <>
            <div className={styles.sightingsSection}>
              <h3 className={styles.title}>Recent sightings</h3>
            </div>
            <div className={styles.sightings}>
              <div className={styles.listContainer}>
                {vehicle.sightings?.map((sighting) => (
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
              {(!vehicle.sightings || vehicle.sightings?.length === 0) && (
                <div className={styles.noResult}>None Yet</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
