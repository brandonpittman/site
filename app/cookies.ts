import { createCookie } from "@remix-run/node";
export const pinboardPassword = createCookie("pinboard-password", {
  maxAge: 604_800, // one week
});
