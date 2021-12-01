import { CronJob } from "quirrel/next";
import { fetchUnread } from "./unread";

export default CronJob("api/pinboard/cache-links", "0 */12 * * *", async () => {
  await fetchUnread();
});
