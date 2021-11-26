import { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import { auth, lrange, get, set, del } from "@upstash/redis";

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

auth(
  "https://apn1-known-marlin-30903.upstash.io",
  "AXi3ACQgNzliYzBhMDctZWNlOC00ZjQ4LWIzOGItMzgwOWQ0ZDk0NzNiOGU2YjQ0ZDJlNWU0NDU4N2IxNmU4MzdjY2RmZjU3MzE="
);

export const setLinks = async (links: PinboardItem[]) => {
  await set("unread", JSON.stringify(links), "ex", 30);
};

export const fetchAll = async () => {
  return await pinboard.all();
};

const updateCache = async () => {
  const all: PinboardItem[] = await fetchAll();
  setLinks(all.filter((v) => v.toread === "yes"));
};

export const fetchUnread = async () => {
  updateCache();
  return JSON.parse((await get("unread")).data);
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
