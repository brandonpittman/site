import matter, { type Input } from 'gray-matter';

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
	const slug = path.match(/\/([^/]+)\.md$/)?.[1];
	return { slug, ...data, content: md };
}) as Note[];

export async function load() {
	const notes = allNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		notes
	};
}
