import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log({ keys: Object.keys(req) });
  res.status(200).json({
    message: "OK",
  });
}
