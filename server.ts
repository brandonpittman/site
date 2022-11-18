import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import { createTypedPagesContext } from "remix-pages-context";
import { z } from "zod";

export let contextSchema = z.object({
  UPSTASH_REDIS_REST_URL: z.string(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
  PINBOARD_PASSWORD: z.string(),
  PINBOARD_TOKEN: z.string(),
  SESSION_SECRET: z.string(),
});

export let { getLoadContext, getPagesContext } = createTypedPagesContext({
  contextSchema,
  sessionSchema: z.object({ password: z.string().optional() }),
});

const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext,
});

export function onRequest(context: EventContext<any, any, any>) {
  return handleRequest(context);
}
