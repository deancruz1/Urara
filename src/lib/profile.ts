import { present } from "./text";
import type { CharacterDetail } from "../types";

const TEXT_FIELDS = [
  "profile", "slogan", "weight", "grade", "residence", "shoe_size",
  "strengths", "weaknesses", "ears_fact", "tail_fact", "family_fact",
] as const;

/** True when Umapyoi has no English profile text for this character yet. */
export const hasNoProfileText = (d: CharacterDetail) =>
  TEXT_FIELDS.every((f) => !present(d[f]));
