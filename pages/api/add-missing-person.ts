import { doc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { serverDB } from "../../utils/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const docID = nanoid();
    const data = req.body;
    await serverDB.collection("reported_missing").doc(docID).set(data);
    return res.status(200).json({ id: docID });
    //Send notification
  } catch (error) {
    console.log("error fetching user", error);
    return res.status(500).json({ error: "Please try again" });
  }
}
