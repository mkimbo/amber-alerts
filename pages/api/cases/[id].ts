import type { NextApiRequest, NextApiResponse } from "next";
import { serverDB } from "../../../utils/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const personID = req.query.id as string;
    console.log("got id", personID);
    const missingPerson = await serverDB
      .collection("reported_missing")
      .doc(personID)
      .get();
    if (!missingPerson.exists)
      return res.status(404).json({ error: "User not found" });
    return res.status(200).json(missingPerson.data());
  } catch (error) {
    console.log("error fetching user", error);
  }
}
