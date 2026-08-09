<script lang="ts">
	import { page } from '$app/state';
	import NotesSearch from './NotesSearch.svelte' with { hydrate: 'load' };
	import { getNotes } from './notes.remote';

	const query = $derived(page.url.searchParams.get('q') || '');
</script>

<svelte:head>
	<title>Notes | Brandon Pittman</title>
</svelte:head>

<article id="notes" class="prose flow">
	<!-- Results are resolved here and handed to the island as props, so hydration has nothing to
	     re-fetch and the list never blanks between SSR and interactive. -->
	<NotesSearch initialQuery={query} initialNotes={await getNotes(query)} />
</article>
