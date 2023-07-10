import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import prefetch from "@astrojs/prefetch";
import solidJs from "@astrojs/solid-js";

import devtools from "solid-devtools/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://brandonpittman.com/",
  integrations: [sitemap(), prefetch(), solidJs()],
  output: "server",
  adapter: cloudflare(),
  vite: {
    plugins: [
      devtools({
        autoname: true,
      }),
    ],
  },
});
