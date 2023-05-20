import { TPerson } from "@/models/missing_person.model";
import { serverDB } from "@/utils/firebase";

export async function getCases(): Promise<TPerson[]> {
  const res = await fetch("http://localhost:3000/api/cases", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export async function getMissingPersonById(
  personId: string
): Promise<TPerson | null> {
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
export async function getMissingPersonList(): Promise<TPerson[]> {
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
