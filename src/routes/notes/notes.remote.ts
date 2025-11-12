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
  const modules = import.meta.glob("./**/+page.md", { eager: true });

  const notes: Note[] = [];

  for (const path in modules) {
    const mod = modules[path] as any;
    const slug = path.split("/").slice(-2, -1)[0];

    if (slug && slug !== "[slug]") {
      notes.push({
        slug: slug,
        title: mod.metadata?.title || "",
        description: mod.metadata?.description || "",
        date: mod.metadata?.date || "",
        draft: mod.metadata?.draft,
      });
    }
  }

  // Sort by date, newest first
  notes.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return notes;
});
