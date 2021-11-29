import readingTime from "reading-time";
import { join } from "path";
import { readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dir = join(process.cwd(), "pages");
  const { route } = req.query;
  const path = decodeURIComponent(route as string);
  const timeToRead = readingTime(
    readFileSync(join(dir, path + ".mdx"), "utf8")
  ).text;

  return res.status(200).send(timeToRead);
}
