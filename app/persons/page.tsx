import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";
import PersonList from "./PersonList";
import { serverDB } from "@/utils/firebase";
import { TPerson } from "@/models/missing_person.model";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Missing Persons",
    description: "Missing Persons near you",
    openGraph: {
      title: "Missing Persons",
      description: "Missing Persons near you",
      type: "website",

      url: `https://amber-alerts.vercel.app/persons`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Missing Persons",
      description: "Missing Persons near you",
    },
  };
}

async function getMissingPersonList(): Promise<TPerson[]> {
  const data: any[] = [];
  const docs = await serverDB.collection("reported_missing").get();
  if (docs.empty) {
    return [];
  }

  docs.forEach((doc) => {
    const dataObj = doc.data();
    data.push({
      id: doc.id,
      ...dataObj,
    });
  });
  return data as TPerson[];
}

export default async function MissingPersonList() {
  const data = await getMissingPersonList();
  return (
    <>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <div className={styles.container}>
          <PersonList personList={data} />
        </div>
      </ServerAuthProvider>
    </>
  );
}
