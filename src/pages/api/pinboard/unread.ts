import { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
// import { isWithinInterval, subMinutes, isBefore } from "date-fns/fp";

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
const client = new Redis(process.env.UPSTASH_BLOG);
// const oneMinuteAgo = () => subMinutes(1)(new Date());

// const withinOneMinute = (date: number) =>
//   isWithinInterval(
//     {
//       start: oneMinuteAgo(),
//       end: new Date(),
//     },
//     date
//   );

export const fetchAll = async () => {
  const links = await pinboard.all();
  client.del("unread").then(() => {
    client.set("unread", JSON.stringify(links), "ex", 30);
  });
  return links;
};

export const fetchUnread = async () => {
  const all = await fetchAll();
  return all.filter((v: { toread: "yes" | "no" }) => v.toread === "yes");
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
