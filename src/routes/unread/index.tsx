import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { Input } from "valibot";
import { parse, array } from "valibot";
import { routeLoader$ } from "@builder.io/qwik-city";
import { SearchForm } from "~/components/search-form";
import { UnreadBlock } from "./unread-block";
import { asyncMap } from "~/util/async-map";
import { schema } from "../books/schema";

import { isDev } from "@builder.io/qwik/build";

export type Book = Input<typeof schema>;

const isStatus = (status: Book["status"]) => (book: Book) =>
  book.status === status;

export const useLoader = routeLoader$(async (e) => {
  const modules = import.meta.glob("/src/routes/books/**/*.md", {
    eager: isDev ? false : true,
  });

  const books = await asyncMap(Object.keys(modules), async (path) => {
    const data = (await modules[path]()) as any;
    const chunks = path.split("/index.md")[0].split("/");
    const slug = chunks[chunks.length - 1];

    return {
      title: data.frontmatter.title || "",
      subtitle: data.frontmatter.subtitle || "",
      author: data.frontmatter.author,
      translator: data.frontmatter.translator,
      status: data.frontmatter.status,
      slug,
    };
  });

  parse(array(schema), books);

  let read = books.filter(isStatus("read"));
  let reading = books.filter(isStatus("reading"));
  let rereading = books.filter(isStatus("rereading"));
  let unread = books.filter(isStatus("unread"));
  let abandoned = books.filter(isStatus("abandoned"));

  const searchParams = e.url.searchParams;
  const q = searchParams.get("q")?.trim();

  if (q === "") {
    throw e.redirect(307, "/unread");
  }

  if (q) {
    const regex = new RegExp(q, "i");
    const filterFn = (v: any) =>
      v.title.match(regex) ||
      v?.genre?.match(regex) ||
      v?.author?.match(regex) ||
      v?.translator?.match(regex);
    unread = unread.filter(filterFn);
    read = read.filter(filterFn);
    reading = reading.filter(filterFn);
    abandoned = abandoned.filter(filterFn);
    rereading = rereading.filter(filterFn);
  }

  const found = [...read, ...rereading, ...unread, ...reading, ...abandoned];

  if (found.length === 1) {
    throw e.redirect(307, `/books/${found[0].slug}`);
  } else {
    return {
      reading,
      unread,
      read,
      abandoned,
      rereading,
    };
  }
});

const libroHref =
  "https://libro.fm/referral?rf_code=lfm486721?utm_source=Libro.fm&utm_medium=email&utm_campaign=Transactional_order_confirmation";

export default component$(() => {
  const data = useLoader();

  return (
    <>
      <p>
        Interested in audiobooks? Check out{" "}
        <a href={libroHref} target="_blank" rel="noopener noreferrer">
          Libro.fm
        </a>
        .
      </p>
      <SearchForm placeholder="Search by title or author…">Title</SearchForm>

      <section id="lists" class="flow">
        <UnreadBlock list={data.value.rereading} title="Rereading" />
        <UnreadBlock list={data.value.reading} title="Reading" />
        <UnreadBlock list={data.value.unread} title="Unread" />
        <UnreadBlock list={data.value.read} title="Read" />
        <UnreadBlock list={data.value.abandoned} title="Abandoned" />
      </section>
    </>
  );
});

export const name = "Brandon";

export const head: DocumentHead = () => {
  return {
    title: "Unread",
    frontmatter: {
      hideH1: true,
    },
  };
};
