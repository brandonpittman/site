<script lang="ts">
	import type { GameList } from '$lib/games.remote';
	import '$lib/styles/list.css';

	let { game_list }: { game_list: GameList } = $props();
</script>

<ul class="item-list">
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
