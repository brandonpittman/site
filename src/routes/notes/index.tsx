import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { NoteList } from "./note-list";
import { NoteLink } from "./note-link";
import type { DocumentHead, DocumentHeadProps } from "@builder.io/qwik-city";
import { z } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { asyncMap } from "~/util/async-map";

const validator = z.array(
  z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().regex(/\d{4}-\d{2}-\d{2}/),
    slug: z.string(),
  })
);

export const useNotes = routeLoader$(async () => {
  const modules = import.meta.glob("/src/routes/notes/**/*.mdx");

  const notes = await asyncMap(Object.keys(modules), async (path) => {
    const data = (await modules[path]()) as DocumentHeadProps;
    const chunks = path.split("/index.mdx")[0].split("/");
    const slug = chunks[chunks.length - 1];

    return {
      title: data.head.title || "",
      description:
        data.head.meta.find((m) => m.name === "description")?.content || "",
      date: data.head.frontmatter.date,
      slug,
    };
  });

  validator.parse(notes);

  return notes.sort((a, b) => {
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
    <article id="notes" class="prose flow-xs">
      <NoteList>
        {notes.value.map((post) => (
          <NoteLink key={post.slug} post={post} />
        ))}
      </NoteList>
    </article>
  );
});

export const head: DocumentHead = {
  title: "Notes",
};
