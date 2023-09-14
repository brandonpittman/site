import { object, array, string, boolean, optional, date } from "valibot";

export const schema = array(
  object({
    title: string("Title required"),
    description: optional(string()),
    date: date(),
    draft: optional(boolean()),
  })
);
