import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import { Buffer } from 'buffer';
import matter, { type Input } from 'gray-matter';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import * as z from 'zod/mini';
import hljs from 'highlight.js/lib/common';

export type Note = {
	slug: string;
	title: string;
	description: string;
	date: string;
	draft?: boolean;
	content: string;
};

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

// Parse once at module scope
const allNotes = Object.entries(noteModules).map(([path, content]) => {
	const fm = matter(content as Input);
	const { data, content: md } = fm;
	const slug = path.match(/\/([^/]+)\.md$/)?.[1];
	return { slug, ...data, content: md };
}) as Note[];

// Get all posts
export const getNotes = query(async () => {
	let notes = allNotes;

	// Only filter in production
	if (!import.meta.env.DEV) {
		const now = new Date();
		notes = notes.filter((note) => {
			// Filter out drafts
			if (note.draft === true) return false;
			// Filter out future-dated notes
			if (new Date(note.date) > now) return false;
			return true;
		});
	}

	return notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// Get single post by slug
export const getNote = query(z.string(), async (slug) => {
	const path = `/content/notes/${slug}.md`;
	const content = noteModules[path];

	if (!content) error(404, 'Post not found');

	const { data, content: markdown } = matter(content as Input);

	return {
		slug,
		meta: data,
		content: marked.parse(markdown)
	};
});
