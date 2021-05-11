import Feed from "rss-to-json";
import { NextApiResponse, NextApiRequest } from "next";

export const getFeed = async () =>
  await Feed.load("https://world.hey.com/blp/feed.atom");

module.exports = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.json(await getFeed());
  } catch (e) {
    return res.status(500).send("Error fetching feed.");
  }
};
