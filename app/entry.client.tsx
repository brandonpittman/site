import { hydrate } from "react-dom";
import { RemixBrowser } from "@remix-run/react";
import { cacheAssets } from "remix-utils";

cacheAssets().catch((error) => {
  console.error(error);
});

caches.open("assets").then((cache) => {
  return cache.addAll(["/", "/gaming"]);
});

hydrate(<RemixBrowser />, document);
