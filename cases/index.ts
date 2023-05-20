import type { NextApiRequest, NextApiResponse } from "next";
import { serverDB } from "../../../utils/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data: any[] = [];
    serverDB
      .collection("reported_missing")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          data.push({ id: doc.id, ...doc.data() });
        });
      });

    return res.status(200).json(data);
  } catch (error) {
    console.log("error fetching user", error);
  }
}
