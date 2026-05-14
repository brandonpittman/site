import { query } from '$app/server';
import * as z from 'zod/mini';
import matter, { type Input } from 'gray-matter';

export type Game = {
	title: string;
	platform: string;
	note?: string;
};

export type GameList = {
	status: 'unplayed' | 'unbeaten' | 'beaten' | 'abandoned';
	games: Game[];
};

// Load all game markdown files at module scope. Games live in the frontmatter
// `games:` list (managed by Sveltia CMS); the body is empty.
const game_modules = import.meta.glob('/content/unplayed/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const all_game_lists = Object.entries(game_modules).map(([path, content]) => {
	const status = path.match(/\/([^/]+)\.md$/)?.[1] as GameList['status'];
	const { data } = matter(content as Input);
	return {
		status,
		games: (data.games ?? []) as Game[]
	};
}) as GameList[];

// Get all game lists
export const get_game_lists = query(async () => {
	return all_game_lists;
});

// Get single game list by status
export const get_game_list = query(z.enum(['unplayed', 'unbeaten', 'beaten', 'abandoned']), async (status) => {
	return all_game_lists.find((list) => list.status === status);
});
