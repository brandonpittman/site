import { query } from '$app/server';
import * as z from 'zod/mini';
import matter, { type Input } from 'gray-matter';

export type Book = {
	title: string;
	author: string;
	note?: string;
	status: 'unread' | 'reading' | 'read' | 'abandoned';
};

export type BookList = {
	status: Book['status'];
	books: Book[];
};

const STATUSES: Book['status'][] = ['unread', 'reading', 'read', 'abandoned'];

// One file per book; the `status` frontmatter field picks the list it renders in.
const book_modules = import.meta.glob('/content/books/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const all_books = Object.values(book_modules).map((content) => matter(content as Input).data as Book);

// Group into the per-status lists the pages expect, each sorted A–Z by title.
const all_book_lists: BookList[] = STATUSES.map((status) => ({
	status,
	books: all_books
		.filter((book) => book.status === status)
		.sort((a, b) => a.title.localeCompare(b.title))
}));

// Get all book lists
export const get_book_lists = query(async () => {
	return all_book_lists;
});

// Get single book list by status
export const get_book_list = query(z.enum(['unread', 'reading', 'read', 'abandoned']), async (status) => {
	return all_book_lists.find((list) => list.status === status);
});
