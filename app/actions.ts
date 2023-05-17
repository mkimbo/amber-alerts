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
import { TNotificationInput, TUserDevice } from "@/models/missing_person.model";
//const geofire = require("geofire-common");
import geofire from "geofire-common";
import { MulticastMessage } from "firebase-admin/lib/messaging/messaging-api";
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
  //notify case owner
  // const caseOwner = await serverDB.collection("users").doc(caseOwnerId).get();
  // const payload = {
  //   notification: {
  //     title: "Sighting Alert",
  //     body: `A person you reported missing has been sighted around ${input?.sightingLocation}`,
  //     //icon: data.image,
  //     click_action: input.personId,
  //   },
  // };
  // const tokenData = [
  //   {
  //     token: caseOwner.data()?.notificationToken,
  //     userId: caseOwnerId,
  //   },
  // ];
  // await sendAlertToUserDevices(tokenData, payload);
  return { success: true, ownerNotified: true };
});

export const saveAlert = zact(saveAlertSchema)(async (data) => {
  const docID = nanoid();
  await serverDB.collection("reported_missing").doc(docID).set(data);
  revalidatePath("/cases");
  const center: geofire.Geopoint = [
    Number(data.geoloc.lat),
    Number(data.geoloc.lng),
  ];
  const notification = {
    title: data.fullname,
    body: "has just been reported missing in your area",
    icon: data.images[0],
    click_action: docID,
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
  if (!nearbyUsers.length) {
    console.log(
      "Sorry, no users nearby! You can also share posters on social media!"
    );
    return { successCount: 0, failureCount: 0 };
  }
  const tokenData = nearbyUsers.map((user) => {
    return {
      token: user.data().notificationToken,
      userId: user.data().id,
    };
  });

  const payload = {
    notification: {
      ...notification,
      click_action: `https://amber-alerts.vercel.app/cases/${notification.click_action}`, //use notification.click_action for the url
    },
  };
  console.log(tokenData, "tokenData", payload, "payload");
  const { successCount, failureCount } = await sendAlertToUserDevices(
    tokenData,
    payload
  );
  return { successCount, failureCount };
};

const getUsersWithinRadiusOfCase = async (
  radiusInM: number,
  caseLocation: geofire.Geopoint
) => {
  const bounds = geofire.geohashQueryBounds(caseLocation, radiusInM);
  const promises = [];
  for (const b of bounds) {
    const q = serverDB
      .collection("users")
      .orderBy("geohash")
      .startAt(b[0])
      .endAt(b[1]);

    promises.push(q.get());
  }
  //console.log(promises, "query promises");
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
  payload: any
) => {
  const tokensToRemove: Promise<any>[] = [];
  const failedTokens: string[] = [];
  let successCount = 0;
  let failureCount = 0;

  const message: MulticastMessage = {
    notification: {
      ...payload,
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
        enabledNotifications: false,
      })
    );
  });

  // Remove devices which are not registered anymore.
  await Promise.all(tokensToRemove);
  return { successCount, failureCount };
};
