<script lang="ts">
	import UnreadItem from './UnreadItem.svelte';

	type Book = {
		slug: string;
		title: string;
		author: string;
		translator?: string;
	};

	type Props = {
		list: Book[];
		title: string;
	};

	let { list, title }: Props = $props();
</script>

{#if list.length > 0}
	<article id={title.toLowerCase()} class="flow">
		<h2 id={title.toLowerCase()}>{title}</h2>
		<ul class="flow">
			{#each list as item (item.slug)}
				<UnreadItem {...item} />
			{/each}
		</ul>
	</article>
{/if}
