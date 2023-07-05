import { z, defineCollection } from "astro:content";

let notesCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    /* tags: z.array(z.string()),
    image: z.string().optional(), */
  }),
});

let booksCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string(),
    started: z.date().optional(),
    completed: z.date().optional(),
    abandoned: z.boolean().optional(),
  }),
});

let gamesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    genre: z.enum(["FPS", "RPG"]),
    started: z.date().optional(),
    completed: z.date().optional(),
    abandoned: z.boolean().optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export let collections = {
  notes: notesCollection,
  books: booksCollection,
  games: gamesCollection,
};
