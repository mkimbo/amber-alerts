import { NextApiRequest, NextApiResponse } from "next";
import { serverDB } from "../../utils/firebase";
// export const config = {
//   runtime: "experimental-edge",
// };

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { phoneNumber, otp, email, id, photoUrl } = req.body;

    const response = await twilioClient.verify.v2
      .services("VA7d5b858fb0469e1515d03c762977a9b0")
      .verificationChecks.create({ to: phoneNumber, code: otp });
    console.log(response.status, "verification status");
    if (response.status === "approved") {
      let data;
      data = {
        id: id,
        email: email,
        phoneNumber: {
          number: phoneNumber,
          verified: true,
        },
        photoUrl: photoUrl,
      };
      const docID = id;
      await serverDB
        .collection("users")
        .doc(docID)
        .set(JSON.parse(JSON.stringify(data)), { merge: true });
      return res.status(200).json({ success: true });
    }

    return res.status(500).json({ error: "Please try again" });
  } catch (error) {
    console.log("error fetching user", error);
  }
}
