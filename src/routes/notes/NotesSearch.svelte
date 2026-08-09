<script lang="ts">
	import { untrack } from 'svelte';
	import NoteLink from './NoteLink.svelte';
	import { getNotes, type NoteSummary } from './notes.remote';

	type Props = { initialQuery?: string; initialNotes: NoteSummary[] };

	let { initialQuery = '', initialNotes }: Props = $props();

	// Seeded once from the URL/page so the island hydrates over the markup the server already
	// rendered. untrack because a one-time seed is the intent -- after hydration these belong to
	// the input and to submit, not to the props.
	let query = $state(untrack(() => initialQuery));

	// Deliberately NOT `{#each await getNotes(...)}`. Awaiting inside the island means hydration
	// re-runs the query, so the server-rendered list is torn down and only comes back when the
	// promise resolves -- a visible flash, and a permanently empty list if that request ever
	// fails. Rendering the results the server already computed means the first paint needs no
	// network at all; only an actual search hits getNotes.
	let notes = $state<NoteSummary[]>(untrack(() => initialNotes));
	let searching = $state(false);

	// No hydration guard needed: this handler only exists once the island has JS. Before that the
	// SSR markup carries no listener, so submitting is a plain GET and the server renders results.
	async function search(event: SubmitEvent) {
		event.preventDefault();
		searching = true;
		try {
			notes = await getNotes(query);
		} finally {
			searching = false;
		}

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
			<button type="submit" class="cta" disabled={searching}>Search</button>
		</div>
	</form>

	<ul class="flow" role="list">
		{#each notes as post (post.slug)}
			<NoteLink {post} />
		{/each}
	</ul>
</div>
