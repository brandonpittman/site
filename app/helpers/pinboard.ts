import { Redis } from "@upstash/redis";

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

let Pinboard = require("node-pinboard").default;
let token = process.env.PINBOARD_TOKEN;
let pinboard = new Pinboard(token);

const { get, set } = Redis.fromEnv();

export let markAsRead = async (item: PinboardItem) => {
  await pinboard.delete(item.href);
  await pinboard.add({ ...item, url: item.href });
};

export let setLinks = async (links: PinboardItem[]) => {
  let unread = await set("unread", JSON.stringify(links));
  let updated = await set("updated", new Date().toISOString());
  return { unread, updated };
};

export let fetchAll = async () => {
  return await pinboard.all();
};

export let updateCache = async () => {
  let all: PinboardItem[] = await fetchAll();
  let toRead = all.filter((v) => v.toread === "yes");
  return setLinks(toRead);
};

export let fetchUnread = async () => {
  await updateCache();
  return await get("unread");
};
