import { object, array, string, optional, enumType } from "valibot";

export const schema = array(
  object({
    title: string(),
    subtitle: optional(string()),
    translator: optional(string()),
    author: string(),
    status: enumType(["read", "unread", "reading", "abandoned"]),
    slug: string(),
  })
);
