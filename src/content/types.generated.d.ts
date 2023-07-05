declare module "astro:content" {
  export { z } from "astro/zod";
  export type CollectionEntry<C extends keyof typeof entryMap> =
    (typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

  type BaseCollectionConfig<S extends import("astro/zod").ZodRawShape> = {
    schema?: S;
    slug?: (entry: {
      id: CollectionEntry<keyof typeof entryMap>["id"];
      defaultSlug: string;
      collection: string;
      body: string;
      data: import("astro/zod").infer<import("astro/zod").ZodObject<S>>;
    }) => string | Promise<string>;
  };
  export function defineCollection<S extends import("astro/zod").ZodRawShape>(
    input: BaseCollectionConfig<S>
  ): BaseCollectionConfig<S>;

  export function getEntry<
    C extends keyof typeof entryMap,
    E extends keyof (typeof entryMap)[C]
  >(collection: C, entryKey: E): Promise<(typeof entryMap)[C][E] & Render>;
  export function getCollection<
    C extends keyof typeof entryMap,
    E extends keyof (typeof entryMap)[C]
  >(
    collection: C,
    filter?: (data: (typeof entryMap)[C][E]) => boolean
  ): Promise<((typeof entryMap)[C][E] & Render)[]>;

  type InferEntrySchema<C extends keyof typeof entryMap> =
    import("astro/zod").infer<
      import("astro/zod").ZodObject<
        Required<ContentConfig["collections"][C]>["schema"]
      >
    >;

  type Render = {
    render(): Promise<{
      Content: import("astro").MarkdownInstance<{}>["Content"];
      headings: import("astro").MarkdownHeading[];
      injectedFrontmatter: Record<string, any>;
    }>;
  };

  const entryMap: {
    blog: {
      "21-months.md": {
        id: "21-months.md";
        slug: "21-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "eight-months.md": {
        id: "eight-months.md";
        slug: "eight-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "eighteen-months.md": {
        id: "eighteen-months.md";
        slug: "eighteen-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "eleven-months.md": {
        id: "eleven-months.md";
        slug: "eleven-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "fifteen-months.md": {
        id: "fifteen-months.md";
        slug: "fifteen-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "five-months.md": {
        id: "five-months.md";
        slug: "five-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "four-months.md": {
        id: "four-months.md";
        slug: "four-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "fourteen-months.md": {
        id: "fourteen-months.md";
        slug: "fourteen-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "hello-world.md": {
        id: "hello-world.md";
        slug: "hello-world";
        body: string;
        collection: "blog";
        data: any;
      };
      "nine-months.md": {
        id: "nine-months.md";
        slug: "nine-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "nineteen-months.md": {
        id: "nineteen-months.md";
        slug: "nineteen-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "one-month.md": {
        id: "one-month.md";
        slug: "one-month";
        body: string;
        collection: "blog";
        data: any;
      };
      "one-year.md": {
        id: "one-year.md";
        slug: "one-year";
        body: string;
        collection: "blog";
        data: any;
      };
      "seven-months.md": {
        id: "seven-months.md";
        slug: "seven-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "seventeen-months.md": {
        id: "seventeen-months.md";
        slug: "seventeen-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "six-months.md": {
        id: "six-months.md";
        slug: "six-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "sixteen-months.md": {
        id: "sixteen-months.md";
        slug: "sixteen-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "ten-months.md": {
        id: "ten-months.md";
        slug: "ten-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "thirteen-months.md": {
        id: "thirteen-months.md";
        slug: "thirteen-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "three-months.md": {
        id: "three-months.md";
        slug: "three-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "twenty-months.md": {
        id: "twenty-months.md";
        slug: "twenty-months";
        body: string;
        collection: "blog";
        data: any;
      };
      "two-months.md": {
        id: "two-months.md";
        slug: "two-months";
        body: string;
        collection: "blog";
        data: any;
      };
    };
  };

  type ContentConfig = never;
}
