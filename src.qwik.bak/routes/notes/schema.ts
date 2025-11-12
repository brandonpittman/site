import {
  object,
  string,
  //boolean,
  optional,
  minLength,
  isoDate,
  fallback,
} from "valibot";

export const schema = object({
  title: string([minLength(1, "Title required.")]),
  description: optional(string()),
  date: fallback(
    string("Date required", [isoDate("ISO date required")]),
    new Date().toISOString().substring(0, 10)
  ),
  //draft: optional(boolean()),
});
