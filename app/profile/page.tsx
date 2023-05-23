import styles from "./page.module.scss";
import {
  ServerAuthProvider,
  getTenantFromCookies,
} from "../../auth/server-auth-provider";
import { UserProfile } from "./UserProfile";
import { serverDB } from "@/utils/firebase";
import { cookies } from "next/headers";
import { updateUserSchema } from "@/models/zod_schemas";
import { z } from "zod";
type TUserProfile = z.infer<typeof updateUserSchema>;
async function getProfileData() {
  const tenant = await getTenantFromCookies(cookies);
  if (!tenant) {
    throw new Error("Please login to access this page");
  }
  const userID = tenant?.id;
  const user = await serverDB.collection("users").doc(userID).get();
  if (!user.exists) {
    return {
      id: userID,
      email: tenant.email,
      photoUrl: tenant.photoUrl,
    } as TUserProfile;
  }
  const userData = user.data();
  return userData as TUserProfile;
}

export default async function Profile() {
  const data = await getProfileData();

  return (
    <div className={styles.container}>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <UserProfile profile={data} />
      </ServerAuthProvider>
    </div>
  );
}
