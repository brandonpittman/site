import { prerender } from '$app/server';
import * as z from 'zod/mini';
import matter, { type Input } from 'gray-matter';

export type Game = {
	title: string;
	platform: string;
	note?: string;
	status: 'unplayed' | 'unbeaten' | 'beaten' | 'abandoned';
};

export type GameList = {
	status: Game['status'];
	games: Game[];
};

const STATUSES: Game['status'][] = ['unplayed', 'unbeaten', 'beaten', 'abandoned'];

// One file per game; the `status` frontmatter field picks the list it renders in.
const game_modules = import.meta.glob('/content/games/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const all_games = Object.values(game_modules).map((content) => matter(content as Input).data as Game);

// Group into the per-status lists the pages expect, each sorted A–Z by title.
const all_game_lists: GameList[] = STATUSES.map((status) => ({
	status,
	games: all_games
		.filter((game) => game.status === status)
		.sort((a, b) => a.title.localeCompare(b.title))
}));

// Get all game lists
export const get_game_lists = prerender(async () => {
	return all_game_lists;
});

// Get single game list by status
export const get_game_list = prerender(
	z.enum(['unplayed', 'unbeaten', 'beaten', 'abandoned']),
	async (status) => {
		return all_game_lists.find((list) => list.status === status);
	},
	{ inputs: () => STATUSES }
);
