<script lang="ts">
	import { untrack } from 'svelte';
	import NoteLink from './NoteLink.svelte';
	import { getNotes } from './notes.remote';

	type Props = { initialQuery?: string };

	let { initialQuery = '' }: Props = $props();

	// Seeded once from the URL so SSR renders the right results for a direct /notes?q=… link and
	// the island hydrates over matching markup. untrack because a one-time seed is the intent --
	// after hydration these are owned by the input and by submit, not by the prop.
	let query = $state(untrack(() => initialQuery));
	// Only the submitted value drives the query -- typing shouldn't refetch on every keystroke.
	let submitted = $state(untrack(() => initialQuery));

	// No hydration guard needed: this handler only exists once the island has JS. Before that the
	// SSR markup carries no listener, so submitting is a plain GET and the server renders results.
	function search(event: SubmitEvent) {
		event.preventDefault();
		submitted = query;

		// Keep the search shareable and the back button honest.
		const url = new URL(location.href);
		if (query) url.searchParams.set('q', query);
		else url.searchParams.delete('q');
		history.pushState({}, '', url);
	}
</script>

<!-- The form and list used to be siblings under `article.prose.flow`, which spaced them apart.
     Islanding moved them inside <ogygia-region>, so that rule now only sees the region -- this
     wrapper puts the flow composition back where the two elements actually sit. -->
<div class="flow">
	<form onsubmit={search}>
		<label for="search" class="visually-hidden">Search</label>
		<div
			class="sidebar"
			data-dir="rtl"
			style="--gutter: var(--space-2xs); --sidebar-min-inline-size: 80%; max-inline-size: 30rem"
		>
			<input bind:value={query} id="search" type="search" name="q" placeholder="Search notes..." />
			<button type="submit" class="cta">Search</button>
		</div>
	</form>

	<ul class="flow" role="list">
		{#each await getNotes(submitted) as post (post.slug)}
			<NoteLink {post} />
		{/each}
	</ul>
</div>
