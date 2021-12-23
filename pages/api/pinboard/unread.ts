import { NextApiRequest, NextApiResponse } from "next";
import { auth, get, set } from "@upstash/redis";

export type PinboardItem = {
  href: string;
  description: string;
  extended: string;
  meta: string;
  hash: string;
  time: string;
  shared: string;
  toread: string;
  tags: string;
};

const Pinboard = require("node-pinboard").default;
const token = process.env.PINBOARD_TOKEN;
const pinboard = new Pinboard(token);

auth(process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN);

export const setLinks = async (links: PinboardItem[]) => {
  const { data: unread } = await set("unread", JSON.stringify(links));
  const { data: updated } = await set("updated", new Date().toISOString());
  return { unread, updated };
};

export const fetchAll = async () => {
  return await pinboard.all();
};

export const updateCache = async () => {
  const all: PinboardItem[] = await fetchAll();
  const toRead = all.filter((v) => v.toread === "yes");
  return setLinks(toRead);
};

export const fetchUnread = async () => {
  updateCache();
  const { data } = await get("unread");
  return JSON.parse(data);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.cookies.password !== process.env.PINBOARD_PASSWORD) {
    return res.status(401).send("Not authorized.");
  }

  const unread = await fetchUnread();

  return res.status(200).json(unread);
}
