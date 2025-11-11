<script lang="ts">
	import SearchForm from '$lib/components/SearchForm.svelte';
	import UnplayedBlock from './UnplayedBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Unplayed | Brandon Pittman</title>
</svelte:head>

<SearchForm placeholder="Search by title, genre, or platform…">Title</SearchForm>

<section id="lists" class="flow">
	<UnplayedBlock list={data.replaying} title="Replaying" />
	<UnplayedBlock list={data.unbeaten} title="Unbeaten" />
	<UnplayedBlock list={data.unplayed} title="Unplayed" />
	<UnplayedBlock list={data.beaten} title="Beaten" />
	<UnplayedBlock list={data.abandoned} title="Abandoned" />
</section>
