declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"books": {
"4000-weeks.md": {
	id: "4000-weeks.md";
  slug: "4000-weeks";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"a-clash-of-kings.md": {
	id: "a-clash-of-kings.md";
  slug: "a-clash-of-kings";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"a-dance-with-dragons.md": {
	id: "a-dance-with-dragons.md";
  slug: "a-dance-with-dragons";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"a-feast-for-crows.md": {
	id: "a-feast-for-crows.md";
  slug: "a-feast-for-crows";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"a-game-of-thrones.md": {
	id: "a-game-of-thrones.md";
  slug: "a-game-of-thrones";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"a-rulebook-for-arguments.md": {
	id: "a-rulebook-for-arguments.md";
  slug: "a-rulebook-for-arguments";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"a-stir-of-echoes.md": {
	id: "a-stir-of-echoes.md";
  slug: "a-stir-of-echoes";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"a-storm-of-swords.md": {
	id: "a-storm-of-swords.md";
  slug: "a-storm-of-swords";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"agile-web-development.md": {
	id: "agile-web-development.md";
  slug: "agile-web-development";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"anger-mercy-revenge.md": {
	id: "anger-mercy-revenge.md";
  slug: "anger-mercy-revenge";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"antifragile.md": {
	id: "antifragile.md";
  slug: "antifragile";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"at-the-existentialist-cafe.md": {
	id: "at-the-existentialist-cafe.md";
  slug: "at-the-existentialist-cafe";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"atomic-design.md": {
	id: "atomic-design.md";
  slug: "atomic-design";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"automate-with-grunt.md": {
	id: "automate-with-grunt.md";
  slug: "automate-with-grunt";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"baptism-of-fire.md": {
	id: "baptism-of-fire.md";
  slug: "baptism-of-fire";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"batman-arkham-asylum.md": {
	id: "batman-arkham-asylum.md";
  slug: "batman-arkham-asylum";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"batman-hush.md": {
	id: "batman-hush.md";
  slug: "batman-hush";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"batman-the-court-of-owls.md": {
	id: "batman-the-court-of-owls.md";
  slug: "batman-the-court-of-owls";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"batman-the-dark-knight-returns.md": {
	id: "batman-the-dark-knight-returns.md";
  slug: "batman-the-dark-knight-returns";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"batman-the-long-halloween.md": {
	id: "batman-the-long-halloween.md";
  slug: "batman-the-long-halloween";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"batman-year-one.md": {
	id: "batman-year-one.md";
  slug: "batman-year-one";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"build-awesome-command-line-applications-in-ruby-2.md": {
	id: "build-awesome-command-line-applications-in-ruby-2.md";
  slug: "build-awesome-command-line-applications-in-ruby-2";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"choke.md": {
	id: "choke.md";
  slug: "choke";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"coffeescript.md": {
	id: "coffeescript.md";
  slug: "coffeescript";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"companion-to-the-stoics.md": {
	id: "companion-to-the-stoics.md";
  slug: "companion-to-the-stoics";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"confident-ruby.md": {
	id: "confident-ruby.md";
  slug: "confident-ruby";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"consider-this.md": {
	id: "consider-this.md";
  slug: "consider-this";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"courage-is-calling.md": {
	id: "courage-is-calling.md";
  slug: "courage-is-calling";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"creating-flow-with-omnifocus.md": {
	id: "creating-flow-with-omnifocus.md";
  slug: "creating-flow-with-omnifocus";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"diary.md": {
	id: "diary.md";
  slug: "diary";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"discourses-fragments-handbook.md": {
	id: "discourses-fragments-handbook.md";
  slug: "discourses-fragments-handbook";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"discourses.md": {
	id: "discourses.md";
  slug: "discourses";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"do-androids-dream-of-electric-sheep.md": {
	id: "do-androids-dream-of-electric-sheep.md";
  slug: "do-androids-dream-of-electric-sheep";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"effective-notetaking.md": {
	id: "effective-notetaking.md";
  slug: "effective-notetaking";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"effortless.md": {
	id: "effortless.md";
  slug: "effortless";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"el-club-dumas.md": {
	id: "el-club-dumas.md";
  slug: "el-club-dumas";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"elements-of-ethics.md": {
	id: "elements-of-ethics.md";
  slug: "elements-of-ethics";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"ember-cli-101.md": {
	id: "ember-cli-101.md";
  slug: "ember-cli-101";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"epictetus-a-stoic-and-socratic-guide-to-life.md": {
	id: "epictetus-a-stoic-and-socratic-guide-to-life.md";
  slug: "epictetus-a-stoic-and-socratic-guide-to-life";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"epitome-of-stoic-ethics.md": {
	id: "epitome-of-stoic-ethics.md";
  slug: "epitome-of-stoic-ethics";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"essentialism.md": {
	id: "essentialism.md";
  slug: "essentialism";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"exceptional-ruby.md": {
	id: "exceptional-ruby.md";
  slug: "exceptional-ruby";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"fight-club-2.md": {
	id: "fight-club-2.md";
  slug: "fight-club-2";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"fight-club.md": {
	id: "fight-club.md";
  slug: "fight-club";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"fooled-by-randomness.md": {
	id: "fooled-by-randomness.md";
  slug: "fooled-by-randomness";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"from-bash-to-z-shell.md": {
	id: "from-bash-to-z-shell.md";
  slug: "from-bash-to-z-shell";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"fugitives-and-refugees.md": {
	id: "fugitives-and-refugees.md";
  slug: "fugitives-and-refugees";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"getting-real.md": {
	id: "getting-real.md";
  slug: "getting-real";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"getting-things-done.md": {
	id: "getting-things-done.md";
  slug: "getting-things-done";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"good-math.md": {
	id: "good-math.md";
  slug: "good-math";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"greek-lives.md": {
	id: "greek-lives.md";
  slug: "greek-lives";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"haunted.md": {
	id: "haunted.md";
  slug: "haunted";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"heartburn.md": {
	id: "heartburn.md";
  slug: "heartburn";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"hellenistic-lives.md": {
	id: "hellenistic-lives.md";
  slug: "hellenistic-lives";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"hellenistic-philsophy.md": {
	id: "hellenistic-philsophy.md";
  slug: "hellenistic-philsophy";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"help!.md": {
	id: "help!.md";
  slug: "help";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"heraclitus-fragments.md": {
	id: "heraclitus-fragments.md";
  slug: "heraclitus-fragments";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"hero-of-two-worlds-the-marquis-de-lafayette-in-the-age-of-revolution.md": {
	id: "hero-of-two-worlds-the-marquis-de-lafayette-in-the-age-of-revolution.md";
  slug: "hero-of-two-worlds-the-marquis-de-lafayette-in-the-age-of-revolution";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"how-to-make-notes-and-write.md": {
	id: "how-to-make-notes-and-write.md";
  slug: "how-to-make-notes-and-write";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"html5-and-css3.md": {
	id: "html5-and-css3.md";
  slug: "html5-and-css3";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"hunting-deer-for-food.md": {
	id: "hunting-deer-for-food.md";
  slug: "hunting-deer-for-food";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"in-fifty-years-we'll-all-be-chicks.md": {
	id: "in-fifty-years-we'll-all-be-chicks.md";
  slug: "in-fifty-years-well-all-be-chicks";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"invisible-monsters-remix.md": {
	id: "invisible-monsters-remix.md";
  slug: "invisible-monsters-remix";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"invisible-monsters.md": {
	id: "invisible-monsters.md";
  slug: "invisible-monsters";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"it-doesn't-have-to-be-crazy-at-work.md": {
	id: "it-doesn't-have-to-be-crazy-at-work.md";
  slug: "it-doesnt-have-to-be-crazy-at-work";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"learn-applescript.md": {
	id: "learn-applescript.md";
  slug: "learn-applescript";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"learning-unix-for-os-x-mountain-lion.md": {
	id: "learning-unix-for-os-x-mountain-lion.md";
  slug: "learning-unix-for-os-x-mountain-lion";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"letters-on-ethics.md": {
	id: "letters-on-ethics.md";
  slug: "letters-on-ethics";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"letters-to-steve-inside-the-e-mail-inbox-of-apple's-steve-jobs.md": {
	id: "letters-to-steve-inside-the-e-mail-inbox-of-apple's-steve-jobs.md";
  slug: "letters-to-steve-inside-the-e-mail-inbox-of-apples-steve-jobs";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"lives-of-the-stoics.md": {
	id: "lives-of-the-stoics.md";
  slug: "lives-of-the-stoics";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"lullaby.md": {
	id: "lullaby.md";
  slug: "lullaby";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"man's-search-for-meaning.md": {
	id: "man's-search-for-meaning.md";
  slug: "mans-search-for-meaning";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"mass-effect-ascension.md": {
	id: "mass-effect-ascension.md";
  slug: "mass-effect-ascension";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"mass-effect-deception.md": {
	id: "mass-effect-deception.md";
  slug: "mass-effect-deception";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"mass-effect-retribution.md": {
	id: "mass-effect-retribution.md";
  slug: "mass-effect-retribution";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"mass-effect-revelation.md": {
	id: "mass-effect-revelation.md";
  slug: "mass-effect-revelation";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"meditations-hayes.md": {
	id: "meditations-hayes.md";
  slug: "meditations-hayes";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"meditations-waterfield.md": {
	id: "meditations-waterfield.md";
  slug: "meditations-waterfield";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"messy.md": {
	id: "messy.md";
  slug: "messy";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"metaprogramming-ruby.md": {
	id: "metaprogramming-ruby.md";
  slug: "metaprogramming-ruby";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"mind-and-cosmos.md": {
	id: "mind-and-cosmos.md";
  slug: "mind-and-cosmos";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"musonius-rufus.md": {
	id: "musonius-rufus.md";
  slug: "musonius-rufus";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"nausea.md": {
	id: "nausea.md";
  slug: "nausea";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"not-taco-bell-material.md": {
	id: "not-taco-bell-material.md";
  slug: "not-taco-bell-material";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"on-writing-well.md": {
	id: "on-writing-well.md";
  slug: "on-writing-well";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"phenomenology-the-basics.md": {
	id: "phenomenology-the-basics.md";
  slug: "phenomenology-the-basics";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"philosophy-as-a-way-of-life.md": {
	id: "philosophy-as-a-way-of-life.md";
  slug: "philosophy-as-a-way-of-life";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"physics-of-the-stoics.md": {
	id: "physics-of-the-stoics.md";
  slug: "physics-of-the-stoics";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"practical-object-oriented-design-in-ruby.md": {
	id: "practical-object-oriented-design-in-ruby.md";
  slug: "practical-object-oriented-design-in-ruby";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"practical-vim.md": {
	id: "practical-vim.md";
  slug: "practical-vim";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"pragmatic-guide-to-javascript.md": {
	id: "pragmatic-guide-to-javascript.md";
  slug: "pragmatic-guide-to-javascript";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"programming-elixir.md": {
	id: "programming-elixir.md";
  slug: "programming-elixir";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"programming-ruby-1.9-and-2.0.md": {
	id: "programming-ruby-1.9-and-2.0.md";
  slug: "programming-ruby-19-and-20";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"pygmy.md": {
	id: "pygmy.md";
  slug: "pygmy";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"quantum-physics.md": {
	id: "quantum-physics.md";
  slug: "quantum-physics";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"rant.md": {
	id: "rant.md";
  slug: "rant";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"roman-lives.md": {
	id: "roman-lives.md";
  slug: "roman-lives";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"season-of-storms.md": {
	id: "season-of-storms.md";
  slug: "season-of-storms";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"several-short-sentences-about-writing.md": {
	id: "several-short-sentences-about-writing.md";
  slug: "several-short-sentences-about-writing";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"shady-characters.md": {
	id: "shady-characters.md";
  slug: "shady-characters";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"shape-up.md": {
	id: "shape-up.md";
  slug: "shape-up";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"skin-in-the-game.md": {
	id: "skin-in-the-game.md";
  slug: "skin-in-the-game";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"snuff.md": {
	id: "snuff.md";
  slug: "snuff";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"steve-jobs.md": {
	id: "steve-jobs.md";
  slug: "steve-jobs";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"stoicism.md": {
	id: "stoicism.md";
  slug: "stoicism";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"summary-of-stoic-philosophy.md": {
	id: "summary-of-stoic-philosophy.md";
  slug: "summary-of-stoic-philosophy";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"survivor.md": {
	id: "survivor.md";
  slug: "survivor";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"take-control-of-bbedit.md": {
	id: "take-control-of-bbedit.md";
  slug: "take-control-of-bbedit";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"take-control-of-the-terminal.md": {
	id: "take-control-of-the-terminal.md";
  slug: "take-control-of-the-terminal";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"tell-all.md": {
	id: "tell-all.md";
  slug: "tell-all";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"text-processing-with-ruby.md": {
	id: "text-processing-with-ruby.md";
  slug: "text-processing-with-ruby";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"that-one-should-disdain-hardships.md": {
	id: "that-one-should-disdain-hardships.md";
  slug: "that-one-should-disdain-hardships";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-4-hour-body-an-uncommon-guide-to-rapid-fat-loss-incredible-sex-and-becoming-superhuman.md": {
	id: "the-4-hour-body-an-uncommon-guide-to-rapid-fat-loss-incredible-sex-and-becoming-superhuman.md";
  slug: "the-4-hour-body-an-uncommon-guide-to-rapid-fat-loss-incredible-sex-and-becoming-superhuman";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-antidote.md": {
	id: "the-antidote.md";
  slug: "the-antidote";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-bed-of-procrustes.md": {
	id: "the-bed-of-procrustes.md";
  slug: "the-bed-of-procrustes";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-black-swan.md": {
	id: "the-black-swan.md";
  slug: "the-black-swan";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-blood-of-elves.md": {
	id: "the-blood-of-elves.md";
  slug: "the-blood-of-elves";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-brewmaster's-table.md": {
	id: "the-brewmaster's-table.md";
  slug: "the-brewmasters-table";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-cucumber-book.md": {
	id: "the-cucumber-book.md";
  slug: "the-cucumber-book";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-god-theory.md": {
	id: "the-god-theory.md";
  slug: "the-god-theory";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-inner-citadel.md": {
	id: "the-inner-citadel.md";
  slug: "the-inner-citadel";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-lady-of-the-lake.md": {
	id: "the-lady-of-the-lake.md";
  slug: "the-lady-of-the-lake";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-life-changing-magic-of-tidying-up.md": {
	id: "the-life-changing-magic-of-tidying-up.md";
  slug: "the-life-changing-magic-of-tidying-up";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-montessori-toddler.md": {
	id: "the-montessori-toddler.md";
  slug: "the-montessori-toddler";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-paleo-manifesto.md": {
	id: "the-paleo-manifesto.md";
  slug: "the-paleo-manifesto";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-practicing-stoic.md": {
	id: "the-practicing-stoic.md";
  slug: "the-practicing-stoic";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-pragmatic-programmer.md": {
	id: "the-pragmatic-programmer.md";
  slug: "the-pragmatic-programmer";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-primal-blueprint.md": {
	id: "the-primal-blueprint.md";
  slug: "the-primal-blueprint";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-primal-connection.md": {
	id: "the-primal-connection.md";
  slug: "the-primal-connection";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-rspec-book.md": {
	id: "the-rspec-book.md";
  slug: "the-rspec-book";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-socratic-method.md": {
	id: "the-socratic-method.md";
  slug: "the-socratic-method";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-storm-before-the-storm-the-beginning-of-the-end-of-the-roman-republic.md": {
	id: "the-storm-before-the-storm-the-beginning-of-the-end-of-the-roman-republic.md";
  slug: "the-storm-before-the-storm-the-beginning-of-the-end-of-the-roman-republic";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-sword-of-destiny.md": {
	id: "the-sword-of-destiny.md";
  slug: "the-sword-of-destiny";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"the-tower-of-swallows.md": {
	id: "the-tower-of-swallows.md";
  slug: "the-tower-of-swallows";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"thucydides-the-war-of-the-peloponnesians-and-the-athenians.md": {
	id: "thucydides-the-war-of-the-peloponnesians-and-the-athenians.md";
  slug: "thucydides-the-war-of-the-peloponnesians-and-the-athenians";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"time-of-contempt.md": {
	id: "time-of-contempt.md";
  slug: "time-of-contempt";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"tiny-habits-the-small-changes-that-change-everything.md": {
	id: "tiny-habits-the-small-changes-that-change-everything.md";
  slug: "tiny-habits-the-small-changes-that-change-everything";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"tmux.md": {
	id: "tmux.md";
  slug: "tmux";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"tranquility-by-tuesday.md": {
	id: "tranquility-by-tuesday.md";
  slug: "tranquility-by-tuesday";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"two-meals-a-day.md": {
	id: "two-meals-a-day.md";
  slug: "two-meals-a-day";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"workflow-mastery.md": {
	id: "workflow-mastery.md";
  slug: "workflow-mastery";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"write-useful-books.md": {
	id: "write-useful-books.md";
  slug: "write-useful-books";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
"zombie-spaceship-wasteland.md": {
	id: "zombie-spaceship-wasteland.md";
  slug: "zombie-spaceship-wasteland";
  body: string;
  collection: "books";
  data: InferEntrySchema<"books">
} & { render(): Render[".md"] };
};
"games": {
"2.md": {
	id: "2.md";
  slug: "2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"3.md": {
	id: "3.md";
  slug: "3";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"4.md": {
	id: "4.md";
  slug: "4";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"another-code-r.md": {
	id: "another-code-r.md";
  slug: "another-code-r";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassin's-creed-2.md": {
	id: "assassin's-creed-2.md";
  slug: "assassins-creed-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassin's-creed-3-the-tyranny-of-king-washington-episode-one:-the-infamy.md": {
	id: "assassin's-creed-3-the-tyranny-of-king-washington-episode-one:-the-infamy.md";
  slug: "assassins-creed-3-the-tyranny-of-king-washington-episode-one-the-infamy";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassin's-creed-3-the-tyranny-of-king-washington-episode-three:-the-redemption.md": {
	id: "assassin's-creed-3-the-tyranny-of-king-washington-episode-three:-the-redemption.md";
  slug: "assassins-creed-3-the-tyranny-of-king-washington-episode-three-the-redemption";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassin's-creed-3-the-tyranny-of-king-washington-episode-two:-the-betrayal.md": {
	id: "assassin's-creed-3-the-tyranny-of-king-washington-episode-two:-the-betrayal.md";
  slug: "assassins-creed-3-the-tyranny-of-king-washington-episode-two-the-betrayal";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassin's-creed-3.md": {
	id: "assassin's-creed-3.md";
  slug: "assassins-creed-3";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassin's-creed-brotherhood.md": {
	id: "assassin's-creed-brotherhood.md";
  slug: "assassins-creed-brotherhood";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassin's-creed-odyssey.md": {
	id: "assassin's-creed-odyssey.md";
  slug: "assassins-creed-odyssey";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassin's-creed-origins.md": {
	id: "assassin's-creed-origins.md";
  slug: "assassins-creed-origins";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassin's-creed-revelations.md": {
	id: "assassin's-creed-revelations.md";
  slug: "assassins-creed-revelations";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassin's-creed.md": {
	id: "assassin's-creed.md";
  slug: "assassins-creed";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-chronicles-china.md": {
	id: "assassins-creed-chronicles-china.md";
  slug: "assassins-creed-chronicles-china";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-iv-black-flag-aveline.md": {
	id: "assassins-creed-iv-black-flag-aveline.md";
  slug: "assassins-creed-iv-black-flag-aveline";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-iv-black-flag-freedom-cry.md": {
	id: "assassins-creed-iv-black-flag-freedom-cry.md";
  slug: "assassins-creed-iv-black-flag-freedom-cry";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-iv-black-flag.md": {
	id: "assassins-creed-iv-black-flag.md";
  slug: "assassins-creed-iv-black-flag";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-liberation-hd.md": {
	id: "assassins-creed-liberation-hd.md";
  slug: "assassins-creed-liberation-hd";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-rogue.md": {
	id: "assassins-creed-rogue.md";
  slug: "assassins-creed-rogue";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-syndicate-jack-the-ripper.md": {
	id: "assassins-creed-syndicate-jack-the-ripper.md";
  slug: "assassins-creed-syndicate-jack-the-ripper";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-syndicate.md": {
	id: "assassins-creed-syndicate.md";
  slug: "assassins-creed-syndicate";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-unity-dead-kings.md": {
	id: "assassins-creed-unity-dead-kings.md";
  slug: "assassins-creed-unity-dead-kings";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-unity.md": {
	id: "assassins-creed-unity.md";
  slug: "assassins-creed-unity";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-valhalla-the-seige-of-paris.md": {
	id: "assassins-creed-valhalla-the-seige-of-paris.md";
  slug: "assassins-creed-valhalla-the-seige-of-paris";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-valhalla-wrath-of-the-druids.md": {
	id: "assassins-creed-valhalla-wrath-of-the-druids.md";
  slug: "assassins-creed-valhalla-wrath-of-the-druids";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"assassins-creed-valhalla.md": {
	id: "assassins-creed-valhalla.md";
  slug: "assassins-creed-valhalla";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"batman-arkham-asylum.md": {
	id: "batman-arkham-asylum.md";
  slug: "batman-arkham-asylum";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"batman-arkham-city.md": {
	id: "batman-arkham-city.md";
  slug: "batman-arkham-city";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"batman-arkham-knight.md": {
	id: "batman-arkham-knight.md";
  slug: "batman-arkham-knight";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"batman-arkham-origins.md": {
	id: "batman-arkham-origins.md";
  slug: "batman-arkham-origins";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"bioshock-infinite-burial-at-sea.md": {
	id: "bioshock-infinite-burial-at-sea.md";
  slug: "bioshock-infinite-burial-at-sea";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"bioshock-infinite.md": {
	id: "bioshock-infinite.md";
  slug: "bioshock-infinite";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"bioshock.md": {
	id: "bioshock.md";
  slug: "bioshock";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"brothers-a-tale-of-two-sons.md": {
	id: "brothers-a-tale-of-two-sons.md";
  slug: "brothers-a-tale-of-two-sons";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"burnout-paradise.md": {
	id: "burnout-paradise.md";
  slug: "burnout-paradise";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"call-of-juarez-bound-in-blood.md": {
	id: "call-of-juarez-bound-in-blood.md";
  slug: "call-of-juarez-bound-in-blood";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"chaos-rings.md": {
	id: "chaos-rings.md";
  slug: "chaos-rings";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"chrono-trigger.md": {
	id: "chrono-trigger.md";
  slug: "chrono-trigger";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"cyberpunk.md": {
	id: "cyberpunk.md";
  slug: "cyberpunk";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"dear-esther.md": {
	id: "dear-esther.md";
  slug: "dear-esther";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"dragon-quest-ix.md": {
	id: "dragon-quest-ix.md";
  slug: "dragon-quest-ix";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"enslaved-odyssey-to-the-west.md": {
	id: "enslaved-odyssey-to-the-west.md";
  slug: "enslaved-odyssey-to-the-west";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"eternal-darkness.md": {
	id: "eternal-darkness.md";
  slug: "eternal-darkness";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"firewatch.md": {
	id: "firewatch.md";
  slug: "firewatch";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"gears-of-war-2.md": {
	id: "gears-of-war-2.md";
  slug: "gears-of-war-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"gears-of-war-3.md": {
	id: "gears-of-war-3.md";
  slug: "gears-of-war-3";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"gears-of-war.md": {
	id: "gears-of-war.md";
  slug: "gears-of-war";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"ghost-trick.md": {
	id: "ghost-trick.md";
  slug: "ghost-trick";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"guardians-of-the-galaxy.md": {
	id: "guardians-of-the-galaxy.md";
  slug: "guardians-of-the-galaxy";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"gungrave.md": {
	id: "gungrave.md";
  slug: "gungrave";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"halo-2-anniversary.md": {
	id: "halo-2-anniversary.md";
  slug: "halo-2-anniversary";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"halo-2.md": {
	id: "halo-2.md";
  slug: "halo-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"halo-3-odst.md": {
	id: "halo-3-odst.md";
  slug: "halo-3-odst";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"halo-3.md": {
	id: "halo-3.md";
  slug: "halo-3";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"halo-4.md": {
	id: "halo-4.md";
  slug: "halo-4";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"halo-5.md": {
	id: "halo-5.md";
  slug: "halo-5";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"halo-combat-evolved-anniversary.md": {
	id: "halo-combat-evolved-anniversary.md";
  slug: "halo-combat-evolved-anniversary";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"halo-infinite.md": {
	id: "halo-infinite.md";
  slug: "halo-infinite";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"halo-reach.md": {
	id: "halo-reach.md";
  slug: "halo-reach";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"heavenly-sword.md": {
	id: "heavenly-sword.md";
  slug: "heavenly-sword";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"ico.md": {
	id: "ico.md";
  slug: "ico";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"journey.md": {
	id: "journey.md";
  slug: "journey";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"just-cause-3.md": {
	id: "just-cause-3.md";
  slug: "just-cause-3";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"klonoa.md": {
	id: "klonoa.md";
  slug: "klonoa";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"l.a.-noire.md": {
	id: "l.a.-noire.md";
  slug: "la-noire";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"legend-of-zelda-phantom-hourglass.md": {
	id: "legend-of-zelda-phantom-hourglass.md";
  slug: "legend-of-zelda-phantom-hourglass";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"legend-of-zelda-spirit-tracks.md": {
	id: "legend-of-zelda-spirit-tracks.md";
  slug: "legend-of-zelda-spirit-tracks";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"legend-of-zelda-twilight-princess.md": {
	id: "legend-of-zelda-twilight-princess.md";
  slug: "legend-of-zelda-twilight-princess";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"little-big-planet.md": {
	id: "little-big-planet.md";
  slug: "little-big-planet";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"mark-of-the-ninja.md": {
	id: "mark-of-the-ninja.md";
  slug: "mark-of-the-ninja";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"mass-effect-2.md": {
	id: "mass-effect-2.md";
  slug: "mass-effect-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"mass-effect-3-the-citadel.md": {
	id: "mass-effect-3-the-citadel.md";
  slug: "mass-effect-3-the-citadel";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"mass-effect-3.md": {
	id: "mass-effect-3.md";
  slug: "mass-effect-3";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"mass-effect.md": {
	id: "mass-effect.md";
  slug: "mass-effect";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"metal-gear-solid-2-sons-of-liberty.md": {
	id: "metal-gear-solid-2-sons-of-liberty.md";
  slug: "metal-gear-solid-2-sons-of-liberty";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"metal-gear-solid-3-snake-eater.md": {
	id: "metal-gear-solid-3-snake-eater.md";
  slug: "metal-gear-solid-3-snake-eater";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"metal-gear-solid-4-guns-of-the-patriots.md": {
	id: "metal-gear-solid-4-guns-of-the-patriots.md";
  slug: "metal-gear-solid-4-guns-of-the-patriots";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"metal-gear-solid-v-ground-zeroes.md": {
	id: "metal-gear-solid-v-ground-zeroes.md";
  slug: "metal-gear-solid-v-ground-zeroes";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"metal-gear-solid-v-the-phantom-pain.md": {
	id: "metal-gear-solid-v-the-phantom-pain.md";
  slug: "metal-gear-solid-v-the-phantom-pain";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"metal-gear-solid.md": {
	id: "metal-gear-solid.md";
  slug: "metal-gear-solid";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"mirror's-edge.md": {
	id: "mirror's-edge.md";
  slug: "mirrors-edge";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"new-super-mario-bros..md": {
	id: "new-super-mario-bros..md";
  slug: "new-super-mario-bros";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"no-more-heroes.md": {
	id: "no-more-heroes.md";
  slug: "no-more-heroes";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"phoenix-wright-ace-attorney.md": {
	id: "phoenix-wright-ace-attorney.md";
  slug: "phoenix-wright-ace-attorney";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"portal-2.md": {
	id: "portal-2.md";
  slug: "portal-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"portal.md": {
	id: "portal.md";
  slug: "portal";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"red-dead-redemption-2.md": {
	id: "red-dead-redemption-2.md";
  slug: "red-dead-redemption-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"red-dead-redemption.md": {
	id: "red-dead-redemption.md";
  slug: "red-dead-redemption";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"rise-of-the-tomb-raider.md": {
	id: "rise-of-the-tomb-raider.md";
  slug: "rise-of-the-tomb-raider";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"shadow-complex.md": {
	id: "shadow-complex.md";
  slug: "shadow-complex";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"shadows-of-the-colossus.md": {
	id: "shadows-of-the-colossus.md";
  slug: "shadows-of-the-colossus";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"shenmue-ii.md": {
	id: "shenmue-ii.md";
  slug: "shenmue-ii";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"shenmue.md": {
	id: "shenmue.md";
  slug: "shenmue";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"south-park-the-fractured-but-whole.md": {
	id: "south-park-the-fractured-but-whole.md";
  slug: "south-park-the-fractured-but-whole";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"south-park-the-stick-of-truth.md": {
	id: "south-park-the-stick-of-truth.md";
  slug: "south-park-the-stick-of-truth";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"splinter-cell-blacklist.md": {
	id: "splinter-cell-blacklist.md";
  slug: "splinter-cell-blacklist";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"splinter-cell-conviction.md": {
	id: "splinter-cell-conviction.md";
  slug: "splinter-cell-conviction";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"super-mario-galaxy-2.md": {
	id: "super-mario-galaxy-2.md";
  slug: "super-mario-galaxy-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"super-mario-galaxy.md": {
	id: "super-mario-galaxy.md";
  slug: "super-mario-galaxy";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"super-paper-mario.md": {
	id: "super-paper-mario.md";
  slug: "super-paper-mario";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"superhot.md": {
	id: "superhot.md";
  slug: "superhot";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tales-from-the-borderlands.md": {
	id: "tales-from-the-borderlands.md";
  slug: "tales-from-the-borderlands";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"teslagrad.md": {
	id: "teslagrad.md";
  slug: "teslagrad";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"the-last-of-us-remastered.md": {
	id: "the-last-of-us-remastered.md";
  slug: "the-last-of-us-remastered";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"the-stanley-parable.md": {
	id: "the-stanley-parable.md";
  slug: "the-stanley-parable";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"the-swapper.md": {
	id: "the-swapper.md";
  slug: "the-swapper";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"the-walking-dead-400-days.md": {
	id: "the-walking-dead-400-days.md";
  slug: "the-walking-dead-400-days";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"the-walking-dead-season-1.md": {
	id: "the-walking-dead-season-1.md";
  slug: "the-walking-dead-season-1";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"the-walking-dead-season-two.md": {
	id: "the-walking-dead-season-two.md";
  slug: "the-walking-dead-season-two";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"the-walking-dead-seasons-1-and-2.md": {
	id: "the-walking-dead-seasons-1-and-2.md";
  slug: "the-walking-dead-seasons-1-and-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"the-witcher-2.md": {
	id: "the-witcher-2.md";
  slug: "the-witcher-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"the-witcher-3.md": {
	id: "the-witcher-3.md";
  slug: "the-witcher-3";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"the-witcher-thronebreaker.md": {
	id: "the-witcher-thronebreaker.md";
  slug: "the-witcher-thronebreaker";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"the-witcher.md": {
	id: "the-witcher.md";
  slug: "the-witcher";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"the-wolf-among-us.md": {
	id: "the-wolf-among-us.md";
  slug: "the-wolf-among-us";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"titanfall-2.md": {
	id: "titanfall-2.md";
  slug: "titanfall-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"titanfall.md": {
	id: "titanfall.md";
  slug: "titanfall";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"tomb-raider-definitive-edition.md": {
	id: "tomb-raider-definitive-edition.md";
  slug: "tomb-raider-definitive-edition";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"trauma.md": {
	id: "trauma.md";
  slug: "trauma";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"uncharted-2.md": {
	id: "uncharted-2.md";
  slug: "uncharted-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"valiant-hearts-the-great-war.md": {
	id: "valiant-hearts-the-great-war.md";
  slug: "valiant-hearts-the-great-war";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"way-of-the-samurai.md": {
	id: "way-of-the-samurai.md";
  slug: "way-of-the-samurai";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
"wolfenstein-the-new-order.md": {
	id: "wolfenstein-the-new-order.md";
  slug: "wolfenstein-the-new-order";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".md"] };
};
"notes": {
"on-deferring-documents.md": {
	id: "on-deferring-documents.md";
  slug: "on-deferring-documents";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"on-learning-latin.md": {
	id: "on-learning-latin.md";
  slug: "on-learning-latin";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"on-minimalist-financial-tracking.md": {
	id: "on-minimalist-financial-tracking.md";
  slug: "on-minimalist-financial-tracking";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"on-the-domains-of-life.md": {
	id: "on-the-domains-of-life.md";
  slug: "on-the-domains-of-life";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"on-use-presence.md": {
	id: "on-use-presence.md";
  slug: "on-use-presence";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
"on-vanilla-extract.md": {
	id: "on-vanilla-extract.md";
  slug: "on-vanilla-extract";
  body: string;
  collection: "notes";
  data: InferEntrySchema<"notes">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
