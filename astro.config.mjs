import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import prefetch from "@astrojs/prefetch";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://brandonpittman.com/",
  integrations: [sitemap(), prefetch(), solidJs()],
  output: "server",
  adapter: cloudflare(),
});

