import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import prefetch from "@astrojs/prefetch";
import preact from "@astrojs/preact";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://brandonpittman.com/",
  integrations: [sitemap(), prefetch(), preact(), svelte()],
  output: "server",
  adapter: cloudflare()
});