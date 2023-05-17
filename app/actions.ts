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
  return { saved: true, ownerNotified: true };
});

export const saveAlert = zact(saveAlertSchema)(async (data) => {
  const docID = nanoid();
  await serverDB.collection("reported_missing").doc(docID).set(data);
  return { success: true, id: docID };
});

export const updateUser = zact(updateUserSchema)(async (data) => {
  await serverDB
    .collection("users")
    .doc(data.id)
    .set(JSON.parse(JSON.stringify(data)), { merge: true });
  return { success: true, data: data };
});
