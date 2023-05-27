// action.ts
"use server";

import { z } from "zod";
import { zact } from "zact/server";
import { nanoid } from "nanoid";
import { admin, serverDB, serverRTDB } from "@/utils/firebase";
import {
  newAlertFormSchema,
  newMotorAlertSchema,
  newSightingFormSchema,
  saveMotorAlertSchema,
  savePersonAlertSchema,
  updateUserSchema,
} from "@/models/zod_schemas";
import { revalidatePath } from "next/cache";
import {
  TAlertType,
  TNotification,
  TNotificationInput,
  TNotifiedUser,
  TSaveNotification,
  TUserDevice,
} from "@/models/missing_person.model";

//import geofire from "geofire-common";
import { MulticastMessage } from "firebase-admin/lib/messaging/messaging-api";
import { getTenantFromCookies } from "@/auth/server-auth-provider";
import { cookies } from "next/headers";
const geofire = require("geofire-common");
const saveSightingSchema = z.intersection(
  newSightingFormSchema,
  z.object({
    itemId: z.string().nonempty("Missing person ID is required"),
    sightedBy: z.string().nonempty("Required"),
    sightingDate: z.string().nonempty("Required"),
  })
);

const saveBannerUrl = z.object({
  bannerUrl: z.string().nonempty("Required"),
  itemId: z.string().nonempty("Required"),
});

export const savePersonBanner = zact(saveBannerUrl)(async (input) => {
  const docRef = serverDB.collection("reported_missing").doc(input.itemId);
  const doc = await docRef.get();

  await docRef.update({
    bannerUrl: input.bannerUrl,
  });
  const url = `/share/${input.itemId}/type=person`;
  revalidatePath(url);
});

export const saveMotorBanner = zact(saveBannerUrl)(async (input) => {
  const docRef = serverDB.collection("missing_motors").doc(input.itemId);
  const doc = await docRef.get();

  await docRef.update({
    bannerUrl: input.bannerUrl,
  });
  const url = `/share/${input.itemId}/type=motor`;
  revalidatePath(url);
});

export const savePersonSighting = zact(saveSightingSchema)(async (input) => {
  const docRef = serverDB.collection("reported_missing").doc(input.itemId);
  const doc = await docRef.get();
  const caseOwnerId = doc.data()?.createdBy;

  await docRef.update({
    sightings: admin.firestore.FieldValue.arrayUnion(input),
  });
  const url = `/persons/${input.itemId}`;
  revalidatePath(url);
  //notify case owner
  const caseOwner = await serverDB.collection("users").doc(caseOwnerId).get();
  const notification = {
    title: doc.data()?.fullname,
    body: `has been sighted around ${input?.sightingLocation?.toLowerCase()}`,
    icon: doc.data()?.images[0],
    click_action: `https://amber-alerts.vercel.app/persons/${input.itemId}`,
    type: "sighting" as TAlertType,
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
  const successfullyNotified = await sendAlertToUserDevices(
    tokenData,
    notification
  );
  return {
    success: true,
    ownerNotified: true,
    notificationSent: successfullyNotified.length > 0,
  };
});

export const saveMotorSighting = zact(saveSightingSchema)(async (input) => {
  const docRef = serverDB.collection("missing_motors").doc(input.itemId);
  const doc = await docRef.get();
  const caseOwnerId = doc.data()?.createdBy;

  await docRef.update({
    sightings: admin.firestore.FieldValue.arrayUnion(input),
  });
  const url = `/vehicles/${input.itemId}`;
  revalidatePath(url);
  //notify case owner
  const caseOwner = await serverDB.collection("users").doc(caseOwnerId).get();
  const notification = {
    title: doc.data()?.licencePlate,
    body: `has been sighted around ${input?.sightingLocation?.toLowerCase()}`,
    icon: doc.data()?.images[0],
    click_action: `https://amber-alerts.vercel.app/vehicles/${input.itemId}`,
    type: "sighting" as TAlertType,
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
  const successfullyNotified = await sendAlertToUserDevices(
    tokenData,
    notification
  );
  return {
    success: true,
    ownerNotified: true,
    notificationSent: successfullyNotified.length > 0,
  };
});

export const saveAlert = zact(savePersonAlertSchema)(async (data) => {
  const docID = nanoid();
  await serverDB.collection("reported_missing").doc(docID).set(data);
  revalidatePath("/persons");
  const center = [Number(data.geoloc.lat), Number(data.geoloc.lng)];
  const notification = {
    title: data.fullname,
    body: "has just been reported missing in your area",
    icon: data.images[0],
    click_action: `https://amber-alerts.vercel.app/persons/${docID}`,
    type: "person" as TAlertType,
  };
  const successfullyNotified = await sendNotifications({
    center,
    notification,
  });
  const notifiedList = [];
  for (const user of successfullyNotified) {
    const distanceInKm = geofire.distanceBetween(center, [user.lat, user.lng]);
    notifiedList.push({
      userId: user.userId,
      distance: distanceInKm,
      points: 10, // TODO: calculate points based on distance
      redeemed: false,
      seen: false,
    });
  }

  await saveNotification({
    content: `${data.fullname} has been reported missing`,
    ownerId: data.createdBy,
    resourceId: docID,
    resourceType: "person",
    createdAt: Date.now(),
    image: data.images[0],
    lat: data.geoloc.lat,
    lng: data.geoloc.lng,
    notifiedUsers: notifiedList,
  });

  return {
    success: true,
    id: docID,
    notificationSent: successfullyNotified.length > 0,
    numUsersNotified: successfullyNotified.length,
  };
});

export const saveMotorAlert = zact(saveMotorAlertSchema)(async (data) => {
  const docID = nanoid();
  await serverDB.collection("missing_motors").doc(docID).set(data);
  let action = "";
  if (data.motorType === "vehicle") {
    revalidatePath("/vehicles");
    action = `https://amber-alerts.vercel.app/vehicles/${docID}`;
  }
  if (data.motorType === "bike") {
    revalidatePath("/bikes");
    action = `https://amber-alerts.vercel.app/bikes/${docID}`;
  }
  const center = [Number(data.geoloc.lat), Number(data.geoloc.lng)];
  const notification = {
    title: data.licencePlate,
    body: "has just been reported missing in your area",
    icon: data.images[0],
    click_action: action,
    type: data.motorType,
  };
  const successfullyNotified = await sendNotifications({
    center,
    notification,
  });
  const notifiedList = [];
  for (const user of successfullyNotified) {
    notifiedList.push({
      userId: user.userId,
      distance: user.subscribedDistance!,
      points: 10, // TODO: calculate points based on distance
      redeemed: false,
      seen: false,
    });
  }

  await saveNotification({
    content: `${data.licencePlate} has been reported missing`,
    ownerId: data.createdBy,
    resourceId: docID,
    resourceType: data.motorType,
    createdAt: Date.now(),
    image: data.images[0],
    lat: data.geoloc.lat,
    lng: data.geoloc.lng,
    notifiedUsers: notifiedList,
  });

  return {
    success: true,
    id: docID,
    notificationSent: successfullyNotified.length > 0,
    numUsersNotified: successfullyNotified.length,
  };
});

export const updateUser = zact(updateUserSchema)(async (data) => {
  await serverDB
    .collection("users")
    .doc(data.id)
    .set(JSON.parse(JSON.stringify(data)), { merge: true });
  revalidatePath("/profile");
  return { success: true, data: data };
});

export const sendNotifications = async ({
  center,
  radius,
  notification,
}: TNotificationInput): Promise<TUserDevice[]> => {
  const radiusInM = radius ? radius * 1000 : 100 * 1000; //100km - should come from user input in future - default should be 5km
  const nearbyUsers = await getUsersWithinRadiusOfCase(radiusInM, center);
  const tenant = await getTenantFromCookies(cookies);
  const tokenData: TUserDevice[] = [];
  const validUsers: TUserDevice[] = [];
  nearbyUsers.forEach((user) => {
    if (user.data().notificationToken && user.data().id !== tenant?.id) {
      tokenData.push({
        token: user.data().notificationToken,
        userId: user.data().id,
        lat: user.data().lat,
        lng: user.data().lng,
        subscriptions: [
          "person",
          "sighting",
          user.data().missingVehicleAlerts ?? "vehicle",
          user.data().missingBikeAlerts ?? "bike",
        ],
        subscribedDistance: user.data().alertRadius ?? 5,
      });
    }
  });

  for (const device of tokenData) {
    const distanceInKm = geofire.distanceBetween(center, [
      device.lat,
      device.lng,
    ]);
    if (
      distanceInKm <= device.subscribedDistance! //&&
      //device.subscriptions!.includes(notification.type!)
    ) {
      validUsers.push({
        ...device,
        subscribedDistance: distanceInKm,
      });
    }
  }

  if (!validUsers.length) {
    console.log("No nearby Users found. No notifications sent.");
    return [];
  }

  const successfullyNotified = await sendAlertToUserDevices(
    validUsers,
    notification
  );
  return successfullyNotified;
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
  const successfullyNotified: TUserDevice[] = [];
  let successCount: TUserDevice[];
  let failureCount = 0;

  const message: MulticastMessage = {
    webpush: {
      notification: {
        title: notification.title,
        body: notification.body,
        icon: notification.icon,
        click_action: notification.click_action,
      },
    },
    tokens: userDevices.map((device) => device.token),
  };
  const response = await admin.messaging().sendEachForMulticast(message);

  response.responses.forEach((resp, idx) => {
    if (!resp.success) {
      if (
        resp.error?.code === "messaging/invalid-registration-token" ||
        resp.error?.code === "messaging/registration-token-not-registered"
      ) {
        failedTokens.push(userDevices[idx].userId);
      }
    } else {
      successfullyNotified.push(userDevices[idx]);
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
  return successfullyNotified;
};

// save notification object to firebase realtime db
export const saveNotification = async (data: TSaveNotification) => {
  const notificationRef = serverRTDB.ref(`notifications`);
  const newKey = notificationRef.push().key;
  await notificationRef.child(newKey!).set({ id: newKey, ...data });
  return { success: true, id: newKey };
};

export const markNotificationsAsSeen = async (data: {
  tenantID: string;
  list: TSaveNotification[];
}) => {
  const updatePromises: Promise<any>[] = [];
  for (const item of data.list) {
    const notificationRef = serverRTDB.ref(`notifications/${item.id}`);
    const notifiedUsers: TNotifiedUser[] = item.notifiedUsers.map((user) => {
      if (user.userId === data.tenantID) {
        return { ...user, seen: true };
      }
      return user;
    });
    updatePromises.push(
      notificationRef.update({
        notifiedUsers: notifiedUsers,
      })
    );
  }
  Promise.all(updatePromises);
};
