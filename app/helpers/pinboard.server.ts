import { Redis } from "@upstash/redis/cloudflare";

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

const redis = (context) =>
  new Redis({
    url: context.UPSTASH_REDIS_REST_URL,
    token: context.UPSTASH_REDIS_REST_TOKEN,
  });

const getEndpoint = (context, method: string, params = "") =>
  `https://api.pinboard.in/v1/${method}?auth_token=${context.PINBOARD_TOKEN}&format=json${params}`;

export let markAsRead = async (context, item: PinboardItem) => {
  await fetch(getEndpoint(context, "posts/delete", `&url=${item.href}`));
  let reducer = (acc: string, cur: [string, string]) => {
    switch (cur[0]) {
      case "href":
        return `${acc}&url=${cur[1]}`;
      case "toread":
        return `${acc}&toread=no`;
      case "description":
        return `${acc}&description=${encodeURIComponent(cur[1])}`;
      default:
        return `${acc}&${cur[0]}=${cur[1]}`;
    }
  };
  let result = Object.entries(item).reduce(reducer, "");
  await fetch(getEndpoint(context, "posts/add", result));
};

export let setLinks = async (context, links: PinboardItem[]) => {
  const { set } = redis(context);
  let unread = await set("unread", JSON.stringify(links));
  let updated = await set("updated", new Date().toISOString());
  return { unread, updated };
};

export let fetchAll = async (context) => {
  let data = await fetch(getEndpoint(context, "posts/all"));
  return await data.json();
};

export let updateCache = async (context) => {
  let all: PinboardItem[] = await fetchAll(context);
  let toRead = all.filter((v) => v.toread === "yes");
  return setLinks(context, toRead);
};

export let fetchUnread = async (context) => {
  // let all: PinboardItem[] = await fetchAll();
  // return all.filter((v) => v.toread === "yes");
  const { get } = redis(context);
  await updateCache(context);
  return await get("unread");
};
