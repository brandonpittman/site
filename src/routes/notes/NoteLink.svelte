<script lang="ts">
	const dateFormatter = new Intl.DateTimeFormat('en', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});

	function formatDate(d: string) {
		return dateFormatter.format(Date.parse(d));
	}

	type Props = {
		post: {
			slug: string;
			date: string;
			title: string;
		};
	};

	let { post }: Props = $props();
</script>

<li>
	<a href={`/notes/${post.slug}`} class="no-underline cluster">
		<span class="color-gray-light white-space-nowrap">
			{formatDate(post.date)}
		</span>
		<span class="font-bold">{post.title}</span>
	</a>
</li>

<style>
	li > a {
		--direction: column;
		--align: start;
		--gutter: 0;
	}

	li > a > span:first-child {
		font-size: var(--size-step--1);
	}
</style>
