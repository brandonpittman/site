<script lang="ts">
	import GameList from '$lib/components/GameList.svelte';
	import { get_game_list } from '$lib/games.remote';

	const beaten = await get_game_list('beaten');
	const unbeaten = await get_game_list('unbeaten');
	const unplayed = await get_game_list('unplayed');
	const abandoned = await get_game_list('abandoned');
</script>

<h2>Unplayed</h2>
<small>A shortlist for potential future play.</small>
<GameList game_list={unplayed!} />

<h2>Unbeaten</h2>
<small>But not abandoned. Yet. Yet?</small>
<GameList game_list={unbeaten!} />

<h2>Beaten</h2>
<small>Some more thoroughly—or more times—than others.</small>
<GameList game_list={beaten!} />

<h2>Abandoned</h2>
<small>Not necessarily bad, just maybe not for me.</small>
<GameList game_list={abandoned!} />
