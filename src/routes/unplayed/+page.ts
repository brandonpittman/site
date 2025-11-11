import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export type Game = {
	slug: string;
	title: string;
	platform: string;
	genre?: string;
	status: 'unbeaten' | 'unplayed' | 'beaten' | 'abandoned' | 'replaying';
};

export const load: PageLoad = async ({ url }) => {
	const modules = import.meta.glob('/src.qwik.bak/routes/games/**/*.md');

	const games: Game[] = [];

	for (const path in modules) {
		const mod = (await modules[path]()) as any;
		const chunks = path.split('/index.md')[0].split('/');
		const slug = chunks[chunks.length - 1];

		games.push({
			title: mod.frontmatter?.title || mod.metadata?.title || '',
			platform: mod.frontmatter?.platform || mod.metadata?.platform || '',
			genre: mod.frontmatter?.genre || mod.metadata?.genre,
			status: mod.frontmatter?.status || mod.metadata?.status || 'unplayed',
			slug
		});
	}

	const isStatus = (status: Game['status']) => (game: Game) => game.status === status;

	let beaten = games.filter(isStatus('beaten'));
	let unbeaten = games.filter(isStatus('unbeaten'));
	let unplayed = games.filter(isStatus('unplayed'));
	let abandoned = games.filter(isStatus('abandoned'));
	let replaying = games.filter(isStatus('replaying'));

	const q = url.searchParams.get('q')?.trim();

	if (q === '') {
		throw redirect(307, '/unplayed');
	}

	if (q) {
		const regex = new RegExp(q, 'i');
		const filterFn = (v: Game) =>
			v.title.match(regex) ||
			v?.platform?.match(regex) ||
			v?.genre?.match(regex);
		unplayed = unplayed.filter(filterFn);
		beaten = beaten.filter(filterFn);
		unbeaten = unbeaten.filter(filterFn);
		abandoned = abandoned.filter(filterFn);
		replaying = replaying.filter(filterFn);
	}

	const found = [...replaying, ...beaten, ...unbeaten, ...unplayed, ...abandoned];

	if (found.length === 1) {
		throw redirect(307, `/games/${found[0].slug}`);
	}

	return {
		unbeaten,
		unplayed,
		beaten,
		abandoned,
		replaying,
		title: 'Unplayed',
		hideH1: true
	};
};
