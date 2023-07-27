import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { z } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { SearchForm } from "~/components/search-form";
import { UnreadBlock } from "./unread-block";
import { asyncMap } from "~/util/async-map";

const validator = z.array(
  z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    translator: z.string().optional(),
    author: z.string(),
    status: z.enum(["read", "unread", "reading", "abandoned"]),
    slug: z.string(),
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

  validator.parse(books);

  const isRead = (b: any) => b.status === "read";
  let read = books.filter(isRead);

  const isReading = (b: any) => b.status === "reading";
  let reading = books.filter(isReading);

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
  }

  return {
    reading,
    unread,
    read,
    abandoned,
  };
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
