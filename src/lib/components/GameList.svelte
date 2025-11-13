<script lang="ts">
	import type { GameList } from '$lib/games.remote';

	let { game_list }: { game_list: GameList } = $props();
</script>

<ul>
	{#each game_list.games as game}
		<li>
			{game.title}
			<span>{game.platform}</span>
			{#if game.note}
				<span>{game.note}</span>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul {
		padding: 0;
		margin: 0;
	}

	li {
		list-style: none;
		padding: 0 0 0 16px;
		position: relative;
	}

	li:before {
		display: block;
		content: '-';
		font-weight: bold;
		position: absolute;
		top: -2px;
		left: 0;
		font-size: 24px;
	}

	span {
		color: #999;
		font-size: 9px;
	}

	span + span {
		font-size: 11px;
		line-height: 13px;
		display: block;
		position: relative;
		top: -2px;
	}
</style>
