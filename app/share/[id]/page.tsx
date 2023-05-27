import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../../auth/server-auth-provider";
import { SharePage } from "./SharePage";
import { TPerson } from "@/models/missing_person.model";
import { serverDB } from "@/utils/firebase";
import { TMotor } from "@/models/misssing_motor.model";
async function getMissingPersonData(personId: string): Promise<TPerson | null> {
  const missingPerson = await serverDB
    .collection("reported_missing")
    .doc(personId)
    .get();
  if (!missingPerson.exists) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("No missing person found with that id");
  }

  return missingPerson.data() as TPerson;
}

async function getMissingMotorData(motorId: string): Promise<TMotor | null> {
  const missingMotor = await serverDB
    .collection("missing_motors")
    .doc(motorId)
    .get();
  if (!missingMotor.exists) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("No missing vehicle/bike found with that id");
  }

  return missingMotor.data() as TMotor;
}

export default async function Share({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { type: string };
}) {
  if (!params.id) {
    throw new Error("No missing Id provided");
  }
  const alertType = searchParams.type;
  if (!alertType) {
    throw new Error("No sighting type provided");
  }

  let personData: TPerson | null = null;
  let motorData: TMotor | null = null;
  if (alertType === "person") {
    personData = await getMissingPersonData(params.id);
  }
  if (alertType === "motor") {
    motorData = await getMissingMotorData(params.id);
  }

  if (!personData && !motorData) {
    throw new Error("No missing person/vehicle/bike found with that id");
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Share</h2>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <SharePage
          id={params.id}
          name={
            personData?.fullname ||
            `${motorData?.make} ${motorData?.model} ${motorData?.year}`
          }
          age={personData?.age}
          gender={personData?.gender}
          color={motorData?.color}
          licencePlates={motorData?.licencePlate}
          phoneNumber={
            personData?.secondaryContact || motorData?.secondaryContact
          }
          imageUrl={personData?.images[0] || motorData?.images[0] || ""}
          type={alertType === "person" ? "person" : "motor"}
          bannerUrl={personData?.bannerUrl || motorData?.bannerUrl}
        />
      </ServerAuthProvider>
    </div>
  );
}
