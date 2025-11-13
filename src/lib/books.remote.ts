import { query } from '$app/server';
import * as z from 'zod/mini';

export type Book = {
	title: string;
	author: string;
	note?: string;
};

export type BookList = {
	status: 'unread' | 'reading' | 'read' | 'abandoned';
	books: Book[];
};

// Load all book markdown files at module scope
const book_modules = import.meta.glob('/content/unread/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

// Parse book entry line
function parse_book_line(line: string): Book | null {
	// Match: "- Title (Author)" or "- Title (Author) (Note)"
	const match = line.match(/^[*-]\s+(.+?)\s+\(([^)]+)\)(?:\s+\(([^)]+)\))?$/);
	if (!match) return null;

	return {
		title: match[1].trim(),
		author: match[2].trim(),
		note: match[3]?.trim()
	};
}

// Parse all book lists once at module scope
const all_book_lists = Object.entries(book_modules).map(([path, content]) => {
	const status_match = path.match(/\/([^/]+)\.md$/)?.[1] as BookList['status'];
	const lines = (content as string).split('\n');
	const books = lines
		.map(parse_book_line)
		.filter((book): book is Book => book !== null);

	return {
		status: status_match,
		books
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
