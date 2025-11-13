<script lang="ts">
	import type { BookList } from '$lib/books.remote';

	let { book_list }: { book_list: BookList } = $props();
</script>

<ul>
	{#each book_list.books as book}
		<li>
			{book.title}
			<span>{book.author}</span>
		</li>
	{/each}
</ul>

<style>
	ul {
		padding: 0;
		margin: 0;
	}

	li {
		list-style: none;
		padding: 0 0 0 16px;
		position: relative;
	}

	li:before {
		display: block;
		content: '-';
		font-weight: bold;
		position: absolute;
		top: -2px;
		left: 0;
		font-size: 24px;
	}

	span {
		color: #999;
		font-size: 9px;
	}
</style>
