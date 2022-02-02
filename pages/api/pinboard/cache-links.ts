import { NextApiRequest, NextApiResponse } from "next";
import { updateCache } from "./unread";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  await updateCache();

  return res.status(200).json({
    message: "Cache updated",
  });
}
