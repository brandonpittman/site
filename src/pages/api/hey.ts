import Feed from "rss-to-json";
import { NextApiResponse, NextApiRequest } from "next";

module.exports = async (_req: NextApiRequest, res: NextApiResponse) => {
  const rss = await Feed.load("https://world.hey.com/blp/feed.atom");
  return res.json(rss);
};
