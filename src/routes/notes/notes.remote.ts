"use server";

export type Note = {
  slug: string;
  title: string;
  description: string;
  date: string;
  draft?: boolean;
};

export async function getNotes(): Promise<Note[]> {
  const modules = import.meta.glob("/content/notes/*.md", { eager: true });

  console.log(modules);

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
}

export async function getNote(slug: string) {
  const modules = import.meta.glob("/content/notes/*.md", { eager: true });

  for (const path in modules) {
    const filename = path.split("/").pop()?.replace(".md", "") || "";
    if (filename === slug) {
      const mod = modules[path] as any;
      return {
        content: mod.default,
        metadata: mod.metadata,
      };
    }
  }

  throw new Error(`Note not found: ${slug}`);
}
