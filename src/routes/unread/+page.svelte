<script lang="ts">
	import BookList from '$lib/components/BookList.svelte';
	import { get_book_list } from '$lib/books.remote';

	const read = get_book_list('read');
	const reading = get_book_list('reading');
	const unread = get_book_list('unread');
	const abandoned = get_book_list('abandoned');
</script>

{#await read then data}
	<h1>Read</h1>
	{#if data}
		<BookList book_list={data} />
	{/if}
{/await}

{#await reading then data}
	<h1>Reading</h1>
	{#if data}
		<BookList book_list={data} />
	{/if}
{/await}

{#await unread then data}
	<h1>Unread</h1>
	{#if data}
		<BookList book_list={data} />
	{/if}
{/await}

{#await abandoned then data}
	<h1>Abandoned</h1>
	{#if data}
		<BookList book_list={data} />
	{/if}
{/await}
