import { hydrate } from "react-dom";
import { RemixBrowser } from "@remix-run/react";
import { cacheAssets } from "remix-utils";

cacheAssets().catch((error) => {
  console.error(error);
});

hydrate(<RemixBrowser />, document);
