<script lang="ts">
	import NoteLink from './NoteLink.svelte';
	import { getNotes } from './notes.remote';

	const notes = await getNotes();
</script>

<svelte:head>
	<title>Notes | Brandon Pittman</title>
</svelte:head>

<article id="notes" class="prose flow-xs">
	<ul class="flow" role="list">
		{#each notes as post (post.slug)}
			<NoteLink {post} />
		{/each}
	</ul>
</article>

<style>
	main {
		flex: 1 1 0%;
	}

	li > :global(a) {
		--gutter: var(--space-2xs);
	}
</style>
