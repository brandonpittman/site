<script lang="ts">
	import type { BookList } from '$lib/books.remote';
	import '$lib/styles/list.css';

	let { book_list }: { book_list: BookList } = $props();
</script>

<ul class="item-list">
	{#each book_list.books as book}
		<li>
			{book.title}
			<span>{book.author}</span>
			{#if book.note}
				<span>{book.note}</span>
			{/if}
		</li>
	{/each}
</ul>
