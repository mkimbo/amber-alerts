import geofire from "geofire-common";
import { z } from "zod";
import { newSightingFormSchema } from "./zod_schemas";
export type TLocation = {
  lng: number;
  lat: number;
  address: string;
  geohash: string;
};

export type TGeoLoc = {
  lng: number;
  lat: number;
};

export type TDetailedLocation = {
  placeId: string;
  geoloc: google.maps.LatLngLiteral;
  geohash: string;
  longAddress: string;
  formattedAddress: string;
  county: string;
  constituency: string;
};

export type TPerson = {
  id?: string;
  fullname: string;
  age: number;
  complexion: string;
  found?: boolean;
  gender: string;
  images: string[];
  lastSeenDate: string;
  lastSeenDescription: string;
  othername?: string;
  obNumber: string;
  secondaryContact: number;
  geoloc: {
    lat: number;
    lng: number;
  };
  policeStation: string;
  createdBy: string;
  lastSeenLocation: string;
  geohash: string;
  longAddress: string;
  formattedAddress: string;
  placeId: string;
  county: string;
  constituency: string;
  sightings?: TSighting[];
};

type SightingFormSchema = z.infer<typeof newSightingFormSchema>;

export interface TSighting extends SightingFormSchema {
  personId: string;
  sightedBy: string;
  sightingDate: string;
}

export type TNotifiedUser = {
  userId: string;
  distance: number;
  redeemed: boolean;
  seen: boolean;
  points: number;
};

export type TSaveNotification = {
  id?: string;
  content: string;
  ownerId: string;
  resourceId: string;
  resourceType: "person" | "vehicle" | "bike" | "sighting";
  createdAt: number;
  image: string;
  lat: number;
  lng: number;
  notifiedUsers: TNotifiedUser[];
};

export type TNotification = {
  title: string;
  body: string;
  icon: string;
  click_action: string;
};
export type TNotificationInput = {
  // center: geofire.Geopoint;
  center: number[];
  radius?: number;
  notification: TNotification;
};
export type TUserDevice = {
  token: string;
  userId: string;
  lat?: number;
  lng?: number;
  subscriptions?: string[];
  subscribedDistance?: number;
};
