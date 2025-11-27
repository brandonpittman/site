<script lang="ts">
	import BookList from '$lib/components/BookList.svelte';
	import { get_book_list } from '$lib/books.remote';

	const read = await get_book_list('read');
	const reading = await get_book_list('reading');
	const unread = await get_book_list('unread');
	const abandoned = await get_book_list('abandoned');
</script>

<h2>Reading</h2>
<small>Books I've started but haven't finished yet.</small>
<BookList book_list={reading!} />

<h2>Unread</h2>
<small>Books I haven't started yet.</small>
<BookList book_list={unread!} />

<h2>Read</h2>
<small>Books I've completed.</small>
<BookList book_list={read!} />

<h2>Abandoned</h2>
<small>Books I didn't enjoy enough to finish.</small>
<BookList book_list={abandoned!} />
