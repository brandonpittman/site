import { query } from "$app/server";
import * as z from "zod/mini";

export type Note = {
  slug: string;
  title: string;
  description: string;
  date: string;
  draft?: boolean;
};

export const getNotes = query(() => {
  const modules = import.meta.glob("/content/notes/*.md", { eager: true });

  const notes: Note[] = [];

  for (const path in modules) {
    const mod = modules[path] as any;
    const filename = path.split("/").pop()?.replace(".md", "") || "";

    notes.push({
      slug: filename,
      title: mod.metadata?.title || "",
      description: mod.metadata?.description || "",
      date: mod.metadata?.date || "",
      draft: mod.metadata?.draft,
    });
  }

  // Sort by date, newest first
  notes.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return notes;
});

export const getNote = query(z.string(), async (slug) => {
  const modules = import.meta.glob("/content/notes/*.md", {
    eager: true,
    import: "default",
  });

  const markdown = modules[`/content/notes/${slug}.md`];

  console.log(markdown);

  return markdown;
});
