<script lang="ts">
	import NoteLink from './NoteLink.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Notes | Brandon Pittman</title>
</svelte:head>

<article id="notes" class="prose flow-xs">
	<ul class="flow" role="list">
		{#each data.notes as post (post.slug)}
			<NoteLink {post} />
		{/each}
	</ul>
</article>
