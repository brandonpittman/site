import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import matter, { type Input } from 'gray-matter';
import { marked } from 'marked';
import { createHighlighter } from 'shiki';
import * as z from 'zod/mini';

export type Note = {
	slug: string;
	title: string;
	description: string;
	date: string;
	draft?: boolean;
	content: string;
};

// Initialize Shiki highlighter once
const highlighter_promise = createHighlighter({
	themes: ['github-dark'],
	langs: ['javascript', 'typescript', 'html', 'css', 'svelte', 'bash', 'json', 'markdown']
});

// Configure marked with Shiki renderer
async function configure_marked() {
	const highlighter = await highlighter_promise;

	marked.use({
		async: true,
		renderer: {
			async code(code, lang) {
				const language = lang || 'text';
				try {
					// Load language if not already loaded
					const loaded_langs = highlighter.getLoadedLanguages();
					if (!loaded_langs.includes(language as any)) {
						await highlighter.loadLanguage(language as any);
					}

					return highlighter.codeToHtml(code, {
						lang: language,
						theme: 'github-dark'
					});
				} catch {
					// Fallback to plain text if language not supported
					return highlighter.codeToHtml(code, {
						lang: 'text',
						theme: 'github-dark'
					});
				}
			}
		}
	});
}

// Configure marked at module scope
await configure_marked();

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
		content: await marked(markdown)
	};
});
