import { component$ } from "@builder.io/qwik";
import type { DocumentHead, DocumentHeadProps } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { SearchForm } from "~/components/SearchForm";
import { UnreadBlock } from "~/components/UnreadBlock";
import { asyncMap } from "~/util/async-map";
import { hideH1 } from "~/util/meta";

export const useLoader = routeLoader$(async (e) => {
  const modules = import.meta.glob("/src/content/books/*.md");

  const books = await asyncMap(Object.keys(modules), async (path) => {
    const data = (await modules[path]()) as DocumentHeadProps;
    const chunks = path.split(".md")[0].split("/");
    const slug = chunks[chunks.length - 1];

    return {
      title: data.frontmatter.title || "",
      author: data.frontmatter.author,
      status: data.frontmatter.status,
      slug,
    };
  });

  const isRead = (b) => b.status === "read";
  let read = books.filter(isRead);

  const isReading = (b) => b.status === "reading";
  let reading = books.filter(isReading);

  const isUnread = (b) => b.status === "unread";
  let unread = books.filter(isUnread);

  const isAbandoned = (b) => b.status === "abandoned";
  let abandoned = books.filter(isAbandoned);

  const searchParams = e.url.searchParams;
  const q = searchParams.get("q")?.trim();

  if (q === "") {
    throw e.redirect(307, "/unread");
  }

  if (q) {
    const regex = new RegExp(q, "i");
    const filterFn = (v) =>
      v.title.match(regex) || v?.genre?.match(regex) || v?.author?.match(regex);
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

export default component$(() => {
  const data = useLoader();

  return (
    <>
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

export const head: DocumentHead = {
  title: "unread",
  meta: [hideH1],
};
