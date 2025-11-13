<script lang="ts">
	import { get_all_book_lists } from './books.remote';
</script>

<svelte:head>
	<title>Unread | Brandon Pittman</title>
</svelte:head>

<article id="unread" class="prose flow-xs">
	<h1>Book Lists</h1>

	<p>
		Interested in audiobooks? Check out{' '}
		<a
			href="https://libro.fm/referral?rf_code=lfm486721?utm_source=Libro.fm&utm_medium=email&utm_campaign=Transactional_order_confirmation"
			target="_blank"
			rel="noopener noreferrer"
		>
			Libro.fm
		</a>
		.
	</p>

	<ul class="flow" role="list">
		{#each await get_all_book_lists() as list (list.slug)}
			<li>
				<a href="/unread/{list.slug}">
					{list.title}
				</a>
			</li>
		{/each}
	</ul>
</article>
