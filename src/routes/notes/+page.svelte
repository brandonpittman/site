<script lang="ts">
	import NoteLink from './NoteLink.svelte';
	import { getNotes } from './notes.remote';
</script>

<svelte:head>
	<title>Notes | Brandon Pittman</title>
</svelte:head>

<article id="notes" class="prose flow-xs">
	<ul class="flow" role="list">
		{#each await getNotes() as post (post.slug)}
			<NoteLink {post} />
		{/each}
	</ul>
</article>
