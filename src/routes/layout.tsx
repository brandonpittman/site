import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$, useDocumentHead } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import styles from "../styles/styles.css?inline";
import { Header } from "~/components/header";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const { title, frontmatter } = useDocumentHead();
  const isH1Hidden = frontmatter.hideH1;

  useStyles$(styles);

  return (
    <>
      <Header />
      <main class="region wrapper prose w-full flow">
        <h1 class={{ "visually-hidden": isH1Hidden }}>{title}</h1>
        <Slot />
      </main>
    </>
  );
});
