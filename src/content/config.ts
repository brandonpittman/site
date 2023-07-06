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
    platform: z.enum([
      "PS4",
      "PS3",
      "PS2",
      "Xbox Series X",
      "Xbox One",
      "Xbox 360",
      "PC",
      "Wii",
      "DS",
    ]),
    genre: z.enum(["FPS", "RPG"]).optional(),
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
