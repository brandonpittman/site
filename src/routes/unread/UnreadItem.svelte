<script lang="ts">
	type Props = {
		slug: string;
		title: string;
		author: string;
		translator?: string;
	};

	let { slug, title, author, translator }: Props = $props();
</script>

<li class="flow-3xs">
	<div class="cluster gutter-3xs" style="--align: baseline;">
		<a href={`/books/${slug}`}>
			<span>{title}</span>
		</a>
		<a
			href={`/unread?q=${author}`}
			class="no-underline color-gray-light text-2xs white-space-nowrap font-medium"
		>
			{author}
		</a>
		{#if translator}
			<span class="no-underline color-gray-light text-2xs white-space-nowrap font-medium">
				&amp;
			</span>
			<a
				href={`/unread?q=${translator}`}
				class="no-underline color-gray-light text-2xs white-space-nowrap font-medium"
			>
				{translator}
			</a>
		{/if}
	</div>
</li>
