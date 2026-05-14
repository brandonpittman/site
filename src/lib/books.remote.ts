import { query } from '$app/server';
import * as z from 'zod/mini';
import matter, { type Input } from 'gray-matter';

export type Book = {
	title: string;
	author: string;
	note?: string;
};

export type BookList = {
	status: 'unread' | 'reading' | 'read' | 'abandoned';
	books: Book[];
};

// Load all book markdown files at module scope. Books live in the frontmatter
// `books:` list (managed by Sveltia CMS); the body is empty.
const book_modules = import.meta.glob('/content/unread/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const all_book_lists = Object.entries(book_modules).map(([path, content]) => {
	const status = path.match(/\/([^/]+)\.md$/)?.[1] as BookList['status'];
	const { data } = matter(content as Input);
	return {
		status,
		books: (data.books ?? []) as Book[]
	};
}) as BookList[];

// Get all book lists
export const get_book_lists = query(async () => {
	return all_book_lists;
});

// Get single book list by status
export const get_book_list = query(z.enum(['unread', 'reading', 'read', 'abandoned']), async (status) => {
	return all_book_lists.find((list) => list.status === status);
});
