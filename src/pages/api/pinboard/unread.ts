import { NextApiRequest, NextApiResponse } from "next";
import { isWithinInterval, subMinutes } from "date-fns/fp";

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

const oneMinuteAgo = () => subMinutes(1)(new Date());

const withinOneMinute = (date: Date) =>
  isWithinInterval(
    {
      start: oneMinuteAgo(),
      end: new Date(),
    },
    date
  );

export const markAsRead = async (item: PinboardItem) => {
  await pinboard.delete(item.href);
  await pinboard.add(item);
};

export const fetchAll = async () => {
  // const {update_time} = await pinboard.update();
  return await pinboard.all();
};

export const fetchUnread = async () => {
  const all = await fetchAll();
  return all.filter((v: { toread: "yes" | "no" }) => v.toread === "yes");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hi");
  const { query } = req;

  if (query.password !== process.env.PINBOARD_PASSWORD) {
    return res.status(401).send("Not authorized.");
  }

  const unread = await fetchUnread();

  return res.status(200).json(unread);
}
