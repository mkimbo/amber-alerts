import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";
import { serverDB } from "@/utils/firebase";
import { TMotor } from "@/models/misssing_motor.model";
import BikeList from "./BikeList";
import { Metadata } from "next";

async function getMissingBikesList(): Promise<TMotor[]> {
  const data: any[] = [];
  const docs = await serverDB.collection("missing_motors").get();
  if (docs.empty) {
    return [];
  }

  docs.forEach((doc) => {
    const dataObj = doc.data();
    //get bikes only
    if (dataObj.motorType == "bike") {
      data.push({
        id: doc.id,
        ...dataObj,
      });
    }
  });
  return data as TMotor[];
}

export const metadata: Metadata = {
  title: "Missing Bikes",
  description: "Missing Bikes List",
};

export default async function MissingBikessList() {
  const data = await getMissingBikesList();
  return (
    <>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <div className={styles.container}>
          <BikeList bikeList={data} />
        </div>
      </ServerAuthProvider>
    </>
  );
}
