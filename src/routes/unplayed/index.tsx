import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { z } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { SearchForm } from "~/components/search-form";
import { UnplayedBlock } from "./unplayed-block";
import { asyncMap } from "~/util/async-map";

const validator = z.array(
  z.object({
    title: z.string(),
    platform: z.enum([
      "PS1",
      "PS2",
      "PS3",
      "PS4",
      "Xbox",
      "Xbox 360",
      "Xbox One",
      "Xbox Series X",
      "GameCube",
      "Wii",
      "DS",
      "iOS",
      "PC",
      "DC",
    ]),
    status: z.enum(["unbeaten", "unplayed", "beaten", "abandoned"]),
    slug: z.string(),
  })
);

export const useLoader = routeLoader$(async (e) => {
  const modules = import.meta.glob("/src/routes/games/**/*.md");

  const games = await asyncMap(Object.keys(modules), async (path) => {
    const data = (await modules[path]()) as any;
    const chunks = path.split("/index.md")[0].split("/");
    const slug = chunks[chunks.length - 1];

    return {
      title: data.frontmatter.title || "",
      platform: data.frontmatter.platform,
      genre: data.frontmatter.genre,
      status: data.frontmatter.status,
      slug,
    };
  });

  //games.sort((a, b) => (a.title < b.title ? -1 : 1));

  validator.parse(games);

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

  const found = [...beaten, ...unbeaten, ...unplayed, ...abandoned];

  if (found.length === 1) {
    throw e.redirect(307, `/games/${found[0].slug}`);
  } else {
    return {
      unbeaten,
      unplayed,
      beaten,
      abandoned,
    };
  }
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

export const head: DocumentHead = () => {
  return {
    title: "Unplayed",
    frontmatter: {
      hideH1: true,
    },
  };
};
