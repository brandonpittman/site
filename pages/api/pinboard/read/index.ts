import { NextApiRequest, NextApiResponse } from "next";

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

export const markAsRead = async (item: PinboardItem) => {
  await pinboard.delete(item.href);
  await pinboard.add({ ...item, url: item.href });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.cookies.password !== process.env.PINBOARD_PASSWORD)
    return res.status(401).end();

  if (req.method !== "POST") throw new Error("POST requests only.");

  const item = req.body;

  await markAsRead(item);

  return res.status(200).json({ message: "updated" });
}
