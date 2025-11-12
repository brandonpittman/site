<script lang="ts">
	import { page } from '$app/stores';
	import { getNote } from '../notes.remote';

	let noteData = $state<{ content: any; metadata: any } | null>(null);

	$effect(() => {
		const slug = $page.params.slug;
		getNote(slug).then((result) => {
			noteData = result;
		});
	});
</script>

<svelte:head>
	{#if noteData}
		<title>{noteData.metadata.title} | Brandon Pittman</title>
		{#if noteData.metadata.description}
			<meta name="description" content={noteData.metadata.description} />
		{/if}
	{/if}
</svelte:head>

{#if noteData}
	<article class="prose flow">
		<h1>{noteData.metadata.title}</h1>
		<noteData.content />
	</article>
{/if}
