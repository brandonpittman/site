import { NextApiRequest, NextApiResponse } from "next";
import { isWithinInterval, subMinutes, isBefore } from "date-fns/fp";
import Redis from "ioredis";

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
const oneMinuteAgo = () => subMinutes(1)(new Date());

const withinOneMinute = (date: number) =>
  isWithinInterval(
    {
      start: oneMinuteAgo(),
      end: new Date(),
    },
    date
  );

export const fetchAll = async () => {
  pinboard
    .update()
    .then(({ update_time }) => client.set("updated", update_time));

  const links = await pinboard.all();

  const mappedLinks = links
    .filter((v: PinboardItem) => v.toread === "yes")
    .map((link: PinboardItem) => JSON.stringify(link));

  client.del("unread").then(() => {
    client.lpush("unread", ...mappedLinks);
  });
  // const cached = (await client.lrange("unread", 0, -1)).map((v) =>
  //   JSON.parse(v)
  // );
  // console.log(cached);
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
