<script lang="ts">
	import { page } from '$app/state';
	import { get_book_list } from '../books.remote';

	let param = $derived(page.params.slug);
	let book_list = $derived(await get_book_list(param!));
</script>

<svelte:head>
	<title>{book_list.meta.title || param} | Brandon Pittman</title>
</svelte:head>

<article class="prose">
	{@html book_list.content}
</article>
