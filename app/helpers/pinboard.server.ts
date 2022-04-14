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

// const { get, set } = Redis.fromEnv();

const { get, set } = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

const getEndpoint = (method: string, params = "") =>
  `https://api.pinboard.in/v1/${method}?auth_token=${PINBOARD_TOKEN}&format=json${params}`;

export let markAsRead = async (item: PinboardItem) => {
  await fetch(getEndpoint("posts/delete", `&url=${item.href}`));
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
  await fetch(getEndpoint("posts/add", result));
};

export let setLinks = async (links: PinboardItem[]) => {
  let unread = await set("unread", JSON.stringify(links));
  let updated = await set("updated", new Date().toISOString());
  return { unread, updated };
};

export let fetchAll = async () => {
  let data = await fetch(getEndpoint("posts/all"));
  return await data.json();
};

export let updateCache = async () => {
  let all: PinboardItem[] = await fetchAll();
  let toRead = all.filter((v) => v.toread === "yes");
  return setLinks(toRead);
};

export let fetchUnread = async () => {
  // let all: PinboardItem[] = await fetchAll();
  // return all.filter((v) => v.toread === "yes");
  await updateCache();
  return await get("unread");
};
