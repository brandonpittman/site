import { createCookie } from "@remix-run/cloudflare";

const SECONDS_IN_DAY = 86400;
export const pinboardPassword = createCookie("pinboard-password", {
  maxAge: SECONDS_IN_DAY * 31,
});
