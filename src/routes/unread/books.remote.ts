import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import matter, { type Input } from 'gray-matter';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import * as z from 'zod/mini';
import hljs from 'highlight.js/lib/common';

export type BookList = {
	slug: string;
	meta: Record<string, any>;
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

// Load all book list files at module scope
const book_list_modules = import.meta.glob('/content/unread/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const book_lists = Object.entries(book_list_modules).reduce(
	(acc, [path, content]) => {
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		acc[slug] = content as string;
		return acc;
	},
	{} as Record<string, string>
);

export const get_book_list = query(z.string(), async (slug) => {
	const raw = book_lists[slug];

	if (!raw) {
		throw error(404, 'Book list not found');
	}

	const { data, content: markdown } = matter(raw as Input);

	return {
		slug,
		meta: data,
		content: marked.parse(markdown)
	};
});

export const get_all_book_lists = query(z.void(), async () => {
	return Object.keys(book_lists).map((slug) => {
		const raw = book_lists[slug];
		const { data } = matter(raw as Input);

		return {
			slug,
			title: data.title || slug,
			...data
		};
	});
});
