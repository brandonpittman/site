import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { PostList } from "~/components/post-list";
import { PostLink } from "~/components/post-link";
import type { DocumentHead, DocumentHeadProps } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { asyncMap } from "~/util/async-map";

export const useNotes = routeLoader$(async () => {
  const modules = import.meta.glob("/src/content/notes/*.md");

  const posts = await asyncMap(Object.keys(modules), async (path) => {
    const data = (await modules[path]()) as DocumentHeadProps;
    const chunks = path.split(".md")[0].split("/");
    const slug = chunks[chunks.length - 1];

    return {
      title: data.head.title || "",
      description:
        data.head.meta.find((m) => m.name === "description")?.content || "",
      date: data.head.frontmatter.date,
      slug,
    };
  });

  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return dateB - dateA;
  });
});

export default component$(() => {
  const notes = useNotes();

  useStylesScoped$(`
  main {
    flex: 1 1 0%;
  }

  li > a {
    --gutter: var(--space-2xs);
  }

  /* details > ul {
    margin-block-start: 1rem;
  }

  summary {
    @media (min-width: 640px) {
      inline-size: 11rem;
      text-align: end;
    }
  } */
    `);
  return (
    <article id="posts" class="prose flow-xs">
      <PostList>
        {notes.value.map((post) => (
          <PostLink key={post.slug} post={post} />
        ))}
      </PostList>
    </article>
  );
});

export const head: DocumentHead = {
  title: "Notes",
};
