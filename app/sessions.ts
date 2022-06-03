import { createCookieSessionStorage } from "@remix-run/cloudflare";

const SECONDS_IN_DAY = 86400;
const MONTH = SECONDS_IN_DAY * 31;
let expires = new Date(Date.now() + MONTH * 1000);
let maxAge = MONTH;

let createSession = () => {
  return createCookieSessionStorage({
    cookie: {
      name: "__session",
      expires,
      maxAge,
      secrets: ["6067c335efc94821b61f2540f5cb5459"],
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    },
  });
};

const { getSession, commitSession, destroySession } = createSession();

export { getSession, commitSession, destroySession };
