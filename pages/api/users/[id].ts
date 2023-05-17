import type { NextApiRequest, NextApiResponse } from "next";
import { serverConfig } from "../../../config/server-config";
import { serverDB } from "../../../utils/firebase";
import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";
// const {
//   getCustomIdAndRefreshTokens,
//   verifyIdToken,
//   createCustomToken,
//   handleTokenRefresh,
//   getUser,
//   deleteUser,
//   verifyAndRefreshExpiredIdToken,
//   setCustomUserClaims,
// } = getFirebaseAuth(serverConfig.serviceAccount, serverConfig.firebaseApiKey);

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("got logged in user");

    const userID = req.query.id as string;
    console.log("got logged in user", userID);
    const user = await serverDB.collection("users").doc(userID).get();
    if (!user.exists) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(user.data());
  } catch (error) {
    console.log("error fetching user", error);
  }
}
