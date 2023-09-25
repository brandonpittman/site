import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { parse, object, string, enumType, optional, array } from "valibot";
import { routeLoader$ } from "@builder.io/qwik-city";
import { SearchForm } from "~/components/search-form";
import { UnreadBlock } from "./unread-block";
import { asyncMap } from "~/util/async-map";

const validator = array(
  object({
    title: string(),
    subtitle: optional(string()),
    translator: optional(string()),
    author: string(),
    status: enumType(["read", "unread", "reading", "abandoned", "rereading"]),
    slug: string(),
  })
);

export const useLoader = routeLoader$(async (e) => {
  const modules = import.meta.glob("/src/routes/books/**/*.md");

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

  parse(validator, books);

  const isRead = (b: any) => b.status === "read";
  let read = books.filter(isRead);

  const isReading = (b: any) => b.status === "reading";
  let reading = books.filter(isReading);

  const isRereading = (b: any) => b.status === "rereading";
  let rereading = books.filter(isRereading);

  const isUnread = (b: any) => b.status === "unread";
  let unread = books.filter(isUnread);

  const isAbandoned = (b: any) => b.status === "abandoned";
  let abandoned = books.filter(isAbandoned);

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

  const found = [...read, ...unread, ...reading, ...abandoned];

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
