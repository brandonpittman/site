<script lang="ts">
	import { page } from '$app/state';
	import { getNote } from '../notes.remote';
	import MessageMe from '$lib/components/MessageMe.svelte';
	import NoteSignature from '$lib/components/NoteSignature.svelte';

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
				See <a href={`/notes/${note.meta.successor}`}>the updated note</a> for my current thoughts.
			{/if}
		</em>
	</p>
{/if}

{@html note.content}

<NoteSignature date={new Date(note.meta.date)} location={note.meta.location} />

<hr />

<MessageMe title={note.meta.title} />
