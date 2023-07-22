import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { SearchForm } from "~/components/SearchForm";
import { UnplayedBlock } from "~/components/UnplayedBlock";
import { asyncMap } from "~/util/async-map";
import { hideH1 } from "~/util/meta";

export const useLoader = routeLoader$(async (e) => {
  const modules = import.meta.glob("/src/content/games/*.md");

  const games = await asyncMap(Object.keys(modules), async (path) => {
    const data = (await modules[path]()) as any;
    const chunks = path.split(".md")[0].split("/");
    const slug = chunks[chunks.length - 1];

    return {
      title: data.frontmatter.title || "",
      platform: data.frontmatter.platform,
      genre: data.frontmatter.genre,
      status: data.frontmatter.status,
      slug,
    };
  });

  const isRead = (b: any) => b.status === "beaten";
  let beaten = games.filter(isRead);

  const isReading = (b: any) => b.status === "unbeaten";
  let unbeaten = games.filter(isReading);

  const isUnread = (b: any) => b.status === "unplayed";
  let unplayed = games.filter(isUnread);

  const isAbandoned = (b: any) => b.status === "abandoned";
  let abandoned = games.filter(isAbandoned);

  const searchParams = e.url.searchParams;
  const q = searchParams.get("q")?.trim();

  if (q === "") {
    throw e.redirect(307, "/unplayed");
  }

  if (q) {
    const regex = new RegExp(q, "i");
    const filterFn = (v: any) =>
      v.title.match(regex) ||
      v?.platform.match(regex) ||
      v?.genre?.match(regex) ||
      v?.author?.match(regex);
    unplayed = unplayed.filter(filterFn);
    beaten = beaten.filter(filterFn);
    unbeaten = unbeaten.filter(filterFn);
    abandoned = abandoned.filter(filterFn);
  }
  return {
    unbeaten,
    unplayed,
    beaten,
    abandoned,
  };
});

export default component$(() => {
  const data = useLoader();

  return (
    <>
      <SearchForm placeholder="Search by title, genre, or platform…">
        Title
      </SearchForm>

      <section id="lists" class="flow">
        <UnplayedBlock list={data.value.unbeaten} title="Unbeaten" />
        <UnplayedBlock list={data.value.unplayed} title="Unplayed" />
        <UnplayedBlock list={data.value.beaten} title="Beaten" />
        <UnplayedBlock list={data.value.abandoned} title="Abandoned" />
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Unplayed",
  meta: [hideH1],
};
