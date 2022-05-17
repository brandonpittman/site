import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
export const loader: LoaderFunction = () => {
  return json({
    person: "Marcus Aurelius",
    text: "You could leave life right now.",
  });
};
