import type { PageLoad } from './$types';

export type Note = {
	slug: string;
	title: string;
	description: string;
	date: string;
	draft?: boolean;
};

export const load: PageLoad = async () => {
	const modules = import.meta.glob('/content/notes/*.md', { eager: true });

	const notes: Note[] = [];

	for (const path in modules) {
		const mod = modules[path] as any;
		const filename = path.split('/').pop()?.replace('.md', '') || '';

		notes.push({
			slug: filename,
			title: mod.metadata?.title || '',
			description: mod.metadata?.description || '',
			date: mod.metadata?.date || '',
			draft: mod.metadata?.draft
		});
	}

	// Sort by date, newest first
	notes.sort((a, b) => {
		const dateA = new Date(a.date).getTime();
		const dateB = new Date(b.date).getTime();
		return dateB - dateA;
	});

	return {
		notes
	};
};
