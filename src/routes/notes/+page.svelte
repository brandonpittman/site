<script lang="ts">
	import { page } from '$app/state';
	import NotesSearch from './NotesSearch.svelte' with { hydrate: 'load' };
</script>

<svelte:head>
	<title>Notes | Brandon Pittman</title>
</svelte:head>

<article id="notes" class="prose flow">
	<NotesSearch initialQuery={page.url.searchParams.get('q') || ''} />
</article>
