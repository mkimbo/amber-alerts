import { z } from "zod";

export const newAlertFormSchema = z.object({
  fullname: z.string().nonempty("Required"),
  othername: z.string().optional(),
  age: z.number().int().positive().max(99, "Invalid age"),
  gender: z.string().nonempty("Required"),
  complexion: z.string().nonempty("Required"),
  lastSeenLocation: z.string().optional(),
  lastSeenDate: z.string().nonempty("Required"),
  placeId: z.string().nonempty("Please choose a location from the dropdown"),
  geoloc: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  geohash: z.string(),
  longAddress: z.string(),
  formattedAddress: z.string(),
  county: z.string(),
  constituency: z.string(),
  secondaryContact: z.string().nonempty("Required"),
  lastSeenDescription: z
    .string()
    .max(350, "Maximum length")
    .nonempty("Required"),
  images: z.array(z.string()).transform((data, ctx) => {
    if (!Array.isArray(data) || data.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please add at least one recent photo",
      });
      return z.NEVER;
    }
    return data.map((item) => item.trim());
  }),
  policeStation: z.string().nonempty("Required"),
  obNumber: z.string().nonempty("Required"),
});

export const newMotorAlertSchema = z.object({
  make: z.string().nonempty("Required"),
  model: z.string().optional(),
  year: z.string().optional(),
  color: z.string().nonempty("Required"),
  motorType: z.enum(["person", "vehicle", "bike", "sighting"]),
  licencePlate: z.string().nonempty("Required"),
  lastSeenLocation: z.string().optional(),
  lastSeenDate: z.string().nonempty("Required"),
  placeId: z.string().nonempty("Please choose a location from the dropdown"),
  geoloc: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  geohash: z.string(),
  longAddress: z.string(),
  formattedAddress: z.string(),
  county: z.string(),
  constituency: z.string(),
  secondaryContact: z.string().nonempty("Required"),
  lastSeenDescription: z
    .string()
    .max(350, "Maximum length")
    .nonempty("Required"),
  images: z.array(z.string()).transform((data, ctx) => {
    if (!Array.isArray(data) || data.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please add at least one recent photo",
      });
      return z.NEVER;
    }
    return data.map((item) => item.trim());
  }),
  policeStation: z.string().nonempty("Required"),
  obNumber: z.string().nonempty("Required"),
});

export const savePersonAlertSchema = z.intersection(
  newAlertFormSchema,
  z.object({
    found: z.boolean(),
    createdBy: z.string().nonempty("Required"),
  })
);

export const saveMotorAlertSchema = z.intersection(
  newMotorAlertSchema,
  z.object({
    found: z.boolean(),
    createdBy: z.string().nonempty("Required"),
  })
);

export const newSightingFormSchema = z.object({
  sightingLocation: z.string().optional(),
  placeId: z.string().nonempty("Please choose a location from the dropdown"),
  geoloc: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  geohash: z.string(),
  longAddress: z.string(),
  formattedAddress: z.string(),
  sightingDescription: z.string().max(350, "Maximum length").optional(),
});

export const updateUserSchema = z.object({
  id: z.string().nonempty("Required"),
  email: z.string().optional(),
  geohash: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  phoneNumber: z
    .object({
      number: z.string(),
      verified: z.boolean(),
    })
    .optional(),
  enabledLocation: z.boolean().optional(),
  missingPersonAlerts: z.boolean().optional(),
  missingVehicleAlerts: z.boolean().optional(),
  missingBikeAlerts: z.boolean().optional(),
  alertRadius: z.number().optional(),
  enabledNotifications: z.boolean().optional(),
  notificationToken: z.string().optional(),
  photoUrl: z.string().optional(),
});
