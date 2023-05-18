// action.ts
"use server";

import { z } from "zod";
import { zact } from "zact/server";
import { nanoid } from "nanoid";
import { admin, serverDB } from "@/utils/firebase";
import {
  newAlertFormSchema,
  newSightingFormSchema,
  updateUserSchema,
} from "@/models/zod_schemas";
import { revalidatePath } from "next/cache";
import {
  TNotification,
  TNotificationInput,
  TUserDevice,
} from "@/models/missing_person.model";

//import geofire from "geofire-common";
import { MulticastMessage } from "firebase-admin/lib/messaging/messaging-api";
const geofire = require("geofire-common");
const saveSightingSchema = z.intersection(
  newSightingFormSchema,
  z.object({
    personId: z.string().nonempty("Missing person ID is required"),
    sightedBy: z.string().nonempty("Required"),
    sightingDate: z.string().nonempty("Required"),
  })
);

const saveAlertSchema = z.intersection(
  newAlertFormSchema,
  z.object({
    found: z.boolean(),
    createdBy: z.string().nonempty("Required"),
  })
);

export const saveSighting = zact(saveSightingSchema)(async (input) => {
  const docRef = serverDB.collection("reported_missing").doc(input.personId);
  const doc = await docRef.get();
  const caseOwnerId = doc.data()?.createdBy;

  await docRef.update({
    sightings: admin.firestore.FieldValue.arrayUnion(input),
  });
  const url = `/cases/${input.personId}`;
  revalidatePath(url);
  //notify case owner
  const caseOwner = await serverDB.collection("users").doc(caseOwnerId).get();
  const notification = {
    title: doc.data()?.fullname,
    body: `has been sighted around ${input?.sightingLocation?.toLowerCase()}`,
    icon: doc.data()?.images[0],
    click_action: `https://amber-alerts.vercel.app/cases/${input.personId}`,
  };
  const tokenData = [
    {
      token: caseOwner.data()?.notificationToken,
      userId: caseOwnerId,
    },
  ];
  if (!caseOwner.data()?.notificationToken) {
    console.log("Case owner has no notification token. No notification sent.");
    return { success: true, ownerNotified: false };
  }
  const { successCount, failureCount } = await sendAlertToUserDevices(
    tokenData,
    notification
  );
  return {
    success: true,
    ownerNotified: true,
    notificationSent: successCount > 0,
  };
});

export const saveAlert = zact(saveAlertSchema)(async (data) => {
  const docID = nanoid();
  await serverDB.collection("reported_missing").doc(docID).set(data);
  revalidatePath("/cases");
  const center = [Number(data.geoloc.lat), Number(data.geoloc.lng)];
  const notification = {
    title: data.fullname,
    body: "has just been reported missing in your area",
    icon: data.images[0],
    click_action: `https://amber-alerts.vercel.app/cases/${docID}`,
  };
  const res = await sendNotifications({ center, notification });

  return {
    success: true,
    id: docID,
    notificationSent: res.successCount > 0,
    numUsersNotified: res.successCount,
  };
});

export const updateUser = zact(updateUserSchema)(async (data) => {
  await serverDB
    .collection("users")
    .doc(data.id)
    .set(JSON.parse(JSON.stringify(data)), { merge: true });
  return { success: true, data: data };
});

export const sendNotifications = async ({
  center,
  radius,
  notification,
}: TNotificationInput): Promise<{
  successCount: number;
  failureCount: number;
}> => {
  const radiusInM = radius ? radius * 1000 : 100 * 1000; //100km
  const nearbyUsers = await getUsersWithinRadiusOfCase(radiusInM, center);

  const tokenData: TUserDevice[] = [];
  nearbyUsers.forEach((user) => {
    if (user.data().notificationToken) {
      tokenData.push({
        token: user.data().notificationToken,
        userId: user.data().id,
      });
    }
  });
  if (!tokenData.length) {
    console.log("No nearby Users found. No notifications sent.");
    return { successCount: 0, failureCount: 0 };
  }
  const { successCount, failureCount } = await sendAlertToUserDevices(
    tokenData,
    notification
  );
  return { successCount, failureCount };
};

const getUsersWithinRadiusOfCase = async (
  radiusInM: number,
  caseLocation: number[]
) => {
  const bounds = await geofire.geohashQueryBounds(caseLocation, radiusInM);
  const promises = [];
  for (const b of bounds) {
    const q = serverDB
      .collection("users")
      .orderBy("geohash")
      .startAt(b[0])
      .endAt(b[1]);

    promises.push(q.get());
  }
  return Promise.all(promises).then((snapshots) => {
    const matchingDocs = [];

    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const lat = doc.get("lat");
        const lng = doc.get("lng");
        // filter out a few false positives due to GeoHash accuracy
        const distanceInKm = geofire.distanceBetween([lat, lng], caseLocation);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          matchingDocs.push(doc);
        }
      }
    }

    return matchingDocs;
  });
};

const sendAlertToUserDevices = async (
  userDevices: TUserDevice[],
  notification: TNotification
) => {
  const tokensToRemove: Promise<any>[] = [];
  const failedTokens: string[] = [];
  let successCount = 0;
  let failureCount = 0;

  const message: MulticastMessage = {
    webpush: {
      notification: notification,
    },
    tokens: userDevices.map((device) => device.token),
  };
  const response = await admin.messaging().sendEachForMulticast(message);
  successCount = response.successCount;
  failureCount = response.failureCount;
  response.responses.forEach((resp, idx) => {
    if (!resp.success) {
      if (
        resp.error?.code === "messaging/invalid-registration-token" ||
        resp.error?.code === "messaging/registration-token-not-registered"
      ) {
        failedTokens.push(userDevices[idx].userId);
      }
    }
  });
  failedTokens.forEach((id) => {
    tokensToRemove.push(
      serverDB.collection("users").doc(id).update({
        notificationToken: null,
        // enabledNotifications: false,
      })
    );
  });

  // Remove devices which are not registered anymore.
  await Promise.all(tokensToRemove);
  return { successCount, failureCount };
};
