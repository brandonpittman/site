import { z, defineCollection } from "astro:content";

let notesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
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

export let collections = {
  notes: notesCollection,
  books: booksCollection,
  games: gamesCollection,
};
