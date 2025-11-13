<script lang="ts">
	import GameList from '$lib/components/GameList.svelte';
	import { get_game_list } from '$lib/games.remote';

	const beaten = get_game_list('beaten');
	const unbeaten = get_game_list('unbeaten');
	const unplayed = get_game_list('unplayed');
	const abandoned = get_game_list('abandoned');
</script>

{#await unplayed then data}
	<h1>Unplayed</h1>

	<small>A shortlist for potential future play.</small>

	{#if data}
		<GameList game_list={data} />
	{/if}
{/await}

{#await unbeaten then data}
	<h1>Unbeaten</h1>
	<small>But not abandoned. Yet. Yet?</small>
	{#if data}
		<GameList game_list={data} />
	{/if}
{/await}

{#await beaten then data}
	<h1>Beaten</h1>
	<small>Some more thoroughly—or more times—than others.</small>
	{#if data}
		<GameList game_list={data} />
	{/if}
{/await}

{#await abandoned then data}
	<h1>Abandoned</h1>
	<small>Not necessarily bad, just maybe not for me.</small>
	{#if data}
		<GameList game_list={data} />
	{/if}
{/await}
