import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import matter, { type Input } from 'gray-matter';
import { marked } from 'marked';
import * as z from 'zod/mini';

export type Note = {
	slug: string;
	title: string;
	description: string;
	date: string;
	draft?: boolean;
	content: string;
};

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
	console.log(md);
	const slug = path.match(/\/([^/]+)\.md$/)?.[1];
	return { slug, ...data, content: md };
}) as Note[];

// Get all posts
export const getNotes = query(async () => {
	return allNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
		content: marked(markdown)
	};
});
