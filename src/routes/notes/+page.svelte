<script lang="ts">
	import { page } from '$app/state';
	import SearchForm from '$lib/components/SearchForm.svelte';
	import NoteLink from './NoteLink.svelte';
	import { getNotes } from './notes.remote';
</script>

<svelte:head>
	<title>Notes | Brandon Pittman</title>
</svelte:head>

<article id="notes" class="prose flow">
	<SearchForm placeholder="Search notes...">Search</SearchForm>

	<ul class="flow" role="list">
		{#each await getNotes(page.url.searchParams.get('q') || '') as post (post.slug)}
			<NoteLink {post} />
		{/each}
	</ul>
</article>
