<script lang="ts">
	type Props = {
		slug: string;
		title: string;
		platform: string;
	};

	let { slug, title, platform }: Props = $props();
</script>

<li class="flow-3xs">
	<div class="cluster gutter-3xs" style="--align: baseline;">
		<a href={`/games/${slug}`}>
			<span>{title}</span>
		</a>
		<a
			href={`/unplayed?q=${platform}`}
			class="no-underline color-gray-light text-2xs white-space-nowrap font-medium"
		>
			{platform}
		</a>
	</div>
</li>
