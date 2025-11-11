<script lang="ts">
	import UnplayedItem from './UnplayedItem.svelte';

	type Game = {
		slug: string;
		title: string;
		platform: string;
	};

	type Props = {
		list: Game[];
		title: string;
	};

	let { list, title }: Props = $props();
</script>

{#if list.length > 0}
	<article id={title.toLowerCase()} class="flow">
		<h2 id={title.toLowerCase()}>{title}</h2>
		<ul class="flow">
			{#each list as item (item.slug)}
				<UnplayedItem {...item} />
			{/each}
		</ul>
	</article>
{/if}
