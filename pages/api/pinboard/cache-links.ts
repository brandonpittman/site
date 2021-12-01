import { CronJob } from "quirrel/next";
import { updateCache } from "./unread";

export default CronJob("api/pinboard/cache-links", "*/5 * * * *", async () => {
  await updateCache();
});
