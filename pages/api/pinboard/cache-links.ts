import { updateCache } from "./unread";

export default async function handler() {
  await updateCache();
}
