import { query } from '$app/server';
import * as z from 'zod/mini';

export type Game = {
	title: string;
	platform: string;
	note?: string;
};

export type GameList = {
	status: 'unplayed' | 'unbeaten' | 'beaten' | 'abandoned';
	games: Game[];
};

// Load all game markdown files at module scope
const game_modules = import.meta.glob('/content/unplayed/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

// Parse game entry line
function parse_game_line(line: string): Game | null {
	// Match: "- Game Title (Platform)" or "- Game Title (Platform) (Note)"
	const match = line.match(/^[*-]\s+(.+?)\s+\(([^)]+)\)(?:\s+\(([^)]+)\))?$/);
	if (!match) return null;

	return {
		title: match[1].trim(),
		platform: match[2].trim(),
		note: match[3]?.trim()
	};
}

// Parse all game lists once at module scope
const all_game_lists = Object.entries(game_modules).map(([path, content]) => {
	const status_match = path.match(/\/([^/]+)\.md$/)?.[1] as GameList['status'];
	const lines = (content as string).split('\n');
	const games = lines
		.map(parse_game_line)
		.filter((game): game is Game => game !== null);

	return {
		status: status_match,
		games
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
