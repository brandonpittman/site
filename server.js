import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import { getLoadContextWithSession as getLoadContext } from "remix-pages-context";

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext,
});

export function onRequest(context) {
  return handleRequest(context);
}
