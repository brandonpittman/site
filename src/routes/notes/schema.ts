import { object, string, boolean, optional, minLength, isoDate } from "valibot";

export const schema = object({
  title: string([minLength(1, "Title required.")]),
  description: optional(string()),
  date: string("Date required", [isoDate("ISO date required")]),
  draft: optional(boolean()),
});
