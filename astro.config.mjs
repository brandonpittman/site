import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import prefetch from "@astrojs/prefetch";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://brandonpittman.com/",
  integrations: [sitemap(), prefetch(), preact()],
  output: "server",
  adapter: cloudflare(),
});

