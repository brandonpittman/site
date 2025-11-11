import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export type Book = {
	slug: string;
	title: string;
	subtitle?: string;
	author: string;
	translator?: string;
	status: 'read' | 'unread' | 'reading' | 'abandoned' | 'rereading';
};

export const load: PageLoad = async ({ url }) => {
	const modules = import.meta.glob('/src.qwik.bak/routes/books/**/*.md');

	const books: Book[] = [];

	for (const path in modules) {
		const mod = (await modules[path]()) as any;
		const chunks = path.split('/index.md')[0].split('/');
		const slug = chunks[chunks.length - 1];

		books.push({
			title: mod.frontmatter?.title || mod.metadata?.title || '',
			subtitle: mod.frontmatter?.subtitle || mod.metadata?.subtitle || '',
			author: mod.frontmatter?.author || mod.metadata?.author || '',
			translator: mod.frontmatter?.translator || mod.metadata?.translator,
			status: mod.frontmatter?.status || mod.metadata?.status || 'unread',
			slug
		});
	}

	const isStatus = (status: Book['status']) => (book: Book) => book.status === status;

	let read = books.filter(isStatus('read'));
	let reading = books.filter(isStatus('reading'));
	let rereading = books.filter(isStatus('rereading'));
	let unread = books.filter(isStatus('unread'));
	let abandoned = books.filter(isStatus('abandoned'));

	const q = url.searchParams.get('q')?.trim();

	if (q === '') {
		throw redirect(307, '/unread');
	}

	if (q) {
		const regex = new RegExp(q, 'i');
		const filterFn = (v: Book) =>
			v.title.match(regex) ||
			v?.author?.match(regex) ||
			v?.translator?.match(regex);
		unread = unread.filter(filterFn);
		read = read.filter(filterFn);
		reading = reading.filter(filterFn);
		abandoned = abandoned.filter(filterFn);
		rereading = rereading.filter(filterFn);
	}

	const found = [...read, ...rereading, ...unread, ...reading, ...abandoned];

	if (found.length === 1) {
		throw redirect(307, `/books/${found[0].slug}`);
	}

	return {
		reading,
		unread,
		read,
		abandoned,
		rereading,
		title: 'Unread',
		hideH1: true
	};
};
