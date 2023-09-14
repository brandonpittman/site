import { object, string, boolean, optional, regex, minLength } from "valibot";

export const schema = object({
  title: string([minLength(1, "Title required.")]),
  description: optional(string()),
  date: string("Date required", [
    regex(/^\d{4}-\d{2}-\d{2}$/, "ISO date required"),
  ]),
  draft: optional(boolean()),
});
