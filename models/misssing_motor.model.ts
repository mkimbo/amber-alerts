import { z } from "zod";
import { saveMotorAlertSchema } from "./zod_schemas";
import { TSighting } from "./missing_person.model";

export type TSavedMotor = z.infer<typeof saveMotorAlertSchema>;

export interface TMotor extends TSavedMotor {
  id?: string;
  sightings?: TSighting[];
  bannerUrl?: string;
}
