<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { getNote } from '../notes.remote';
	import NoteSignature from '#lib/components/NoteSignature.svelte';

	let param = $derived(page.params.slug);
	let note = $derived(await getNote(param!));
</script>

<svelte:head>
	<title>{note.meta.title} | Brandon Pittman</title>

	{#if note.meta.description}
		<meta name="description" content={note.meta.description} />
	{/if}
</svelte:head>

<h1>{note.meta.title}</h1>

{#if note.meta.deprecated}
	<p class="color-gray-light">
		<em>
			This note no longer reflects my current thinking, but I'm leaving it up for posterity.
			{#if note.meta.successor}
				See <a href={resolve('/notes/[slug]', { slug: note.meta.successor })}>the updated note</a> for
				my current thoughts.
			{/if}
		</em>
	</p>
{/if}

<!-- eslint-disable-next-line svelte/no-at-html-tags -- html is rendered at build time from our own markdown in content/notes -->
{@html note.html}

<NoteSignature date={new Date(note.meta.date)} location={note.meta.location} />
