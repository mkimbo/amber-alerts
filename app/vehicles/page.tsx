import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";

import { serverDB } from "@/utils/firebase";
import { TMotor } from "@/models/misssing_motor.model";
import VehicleList from "./VehicleList";
import { Metadata } from "next";

async function getMissingVehicleList(): Promise<TMotor[]> {
  const data: any[] = [];
  const docs = await serverDB.collection("missing_motors").get();
  if (docs.empty) {
    return [];
  }

  docs.forEach((doc) => {
    const dataObj = doc.data();
    //get vehicles only
    if (dataObj.motorType == "vehicle") {
      data.push({
        id: doc.id,
        ...dataObj,
      });
    }
  });
  return data as TMotor[];
}

export const metadata: Metadata = {
  title: "Missing Vehicles",
  description: "Missing Vehicles List",
};

export default async function MissingVehiclesList() {
  const data = await getMissingVehicleList();
  return (
    <>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <div className={styles.container}>
          <VehicleList vehicleList={data} />
        </div>
      </ServerAuthProvider>
    </>
  );
}
