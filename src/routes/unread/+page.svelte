<script lang="ts">
	import SearchForm from '$lib/components/SearchForm.svelte';
	import UnreadBlock from './UnreadBlock.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const libroHref =
		'https://libro.fm/referral?rf_code=lfm486721?utm_source=Libro.fm&utm_medium=email&utm_campaign=Transactional_order_confirmation';
</script>

<svelte:head>
	<title>Unread | Brandon Pittman</title>
</svelte:head>

<p>
	Interested in audiobooks? Check out
	<a href={libroHref} target="_blank" rel="noopener noreferrer">Libro.fm</a>.
</p>
<SearchForm placeholder="Search by title or author…">Title</SearchForm>

<section id="lists" class="flow">
	<UnreadBlock list={data.rereading} title="Rereading" />
	<UnreadBlock list={data.reading} title="Reading" />
	<UnreadBlock list={data.unread} title="Unread" />
	<UnreadBlock list={data.read} title="Read" />
	<UnreadBlock list={data.abandoned} title="Abandoned" />
</section>
