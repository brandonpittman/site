import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";
import { cacheAssets } from "remix-utils";

cacheAssets().catch(console.error);

caches.open("assets").then((cache) => {
  return cache.addAll(["/", "/writing", "/reading", "/playing"]);
});

hydrateRoot(document, <RemixBrowser />);
