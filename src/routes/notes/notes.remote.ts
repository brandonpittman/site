import { prerender } from '$app/server';
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import matter, { type Input } from 'gray-matter';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import * as z from 'zod/mini';
import hljs from 'highlight.js/lib/common';

// Raw note: shape of the markdown source — frontmatter plus the unparsed markdown body.
export type RawNote = {
	slug: string;
	title: string;
	description: string;
	date: string;
	draft?: boolean;
	deprecated?: boolean;
	successor?: string;
	location?: string;
	content: string;
};

// Rendered note: the markdown body parsed to an `html` string at build time.
export type Note = Omit<RawNote, 'content'> & { html: string };

const marked = new Marked(
	markedHighlight({
		emptyLangClass: 'hljs',
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	})
);

// Load all posts at module scope
const noteModules = import.meta.glob('/content/notes/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

// Parse frontmatter once at module scope
const allNotes = Object.entries(noteModules).map(([path, content]) => {
	const fm = matter(content as Input);
	const { data, content: md } = fm;
	const slug = path.match(/\/([^/]+)\.md$/)?.[1];
	return { slug, ...data, content: md };
}) as RawNote[];

// Render each note's markdown body to html once, at build time.
const renderedBySlug = new Map<string, Note>(
	allNotes.map(({ content, ...meta }) => [meta.slug, { ...meta, html: marked.parse(content) as string }])
);

// Get all posts
export const getNotes = prerender(
	z.string(),
	async (q = '') => {
		let notes = allNotes;

		// Production hides drafts + future-dated notes (visible in dev for preview)
		if (!dev) {
			const now = new Date();
			notes = notes.filter((note) => {
				if (note.draft === true) return false;
				if (new Date(note.date) > now) return false;
				return true;
			});
		}

		// Apply search filter if query provided
		const searchQuery = q.toLowerCase();
		if (searchQuery) {
			notes = notes.filter((note) => {
				const searchableText = `${note.title} ${note.content}`.toLowerCase();
				return searchableText.includes(searchQuery);
			});
		}

		return notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	},
	// Bake the unfiltered list; arbitrary search queries render on demand.
	{ inputs: () => [''], dynamic: true }
);

// Get single post by slug
export const getNote = prerender(
	z.string(),
	async (slug) => {
		const note = renderedBySlug.get(slug);

		if (!note) error(404, 'Post not found');

		// Drafts are not reachable in production, even by direct URL (visible in dev).
		if (!dev && note.draft === true) error(404, 'Post not found');

		return {
			slug,
			meta: note,
			html: note.html
		};
	},
	// Drafts 404 at build time, so only enumerate publishable slugs as inputs.
	{ inputs: () => allNotes.filter((note) => note.draft !== true).map((note) => note.slug) }
);
