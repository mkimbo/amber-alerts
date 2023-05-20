import * as firebaseAdmin from "firebase-admin";
//import { TUserDevice } from "../../pages/api/report/missing";

// get this JSON from the Firebase board
// you can also store the values in environment variables
//import serviceAccount from "../../config/AdminSA.json";
import { TUserDevice } from "../../models/missing_person.model";

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      serviceAccount as firebaseAdmin.ServiceAccount
    ),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}
//export const geofire = require("geofire-common");
export const serverDB = firebaseAdmin.firestore();
export const serverRTDB = firebaseAdmin.database();
export const admin = firebaseAdmin;

export const getUser = async (id: string) => {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log("error fetching user", error);
  }
};
