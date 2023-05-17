import { NextApiRequest, NextApiResponse } from "next";
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
    const { phoneNumber } = req.body;
    const response = await twilioClient.verify.v2
      .services("VA7d5b858fb0469e1515d03c762977a9b0")
      .verifications.create({ to: phoneNumber, channel: "sms" });
    console.log(response, "response");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("error sending otp", error);
  }
}
