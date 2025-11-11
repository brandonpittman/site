import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { Input } from "valibot";
import { parse, array } from "valibot";
import { routeLoader$ } from "@builder.io/qwik-city";
import { SearchForm } from "~/components/search-form";
import { UnplayedBlock } from "./unplayed-block";
import { asyncMap } from "~/util/async-map";
import { schema } from "../games/schema";

export type Game = Input<typeof schema>;

const isStatus = (status: Game["status"]) => (book: Game) =>
  book.status === status;

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

  parse(array(schema), games);

  let beaten = games.filter(isStatus("beaten"));
  let unbeaten = games.filter(isStatus("unbeaten"));
  let unplayed = games.filter(isStatus("unplayed"));
  let abandoned = games.filter(isStatus("abandoned"));
  let replaying = games.filter(isStatus("replaying"));

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
    replaying = replaying.filter(filterFn);
  }

  const found = [
    ...replaying,
    ...beaten,
    ...unbeaten,
    ...unplayed,
    ...abandoned,
  ];

  if (found.length === 1) {
    throw e.redirect(307, `/games/${found[0].slug}`);
  } else {
    return {
      unbeaten,
      unplayed,
      beaten,
      abandoned,
      replaying,
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
        <UnplayedBlock list={data.value.replaying} title="Replaying" />
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
