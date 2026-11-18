<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { Path } from '$app/types';
	import type { Snippet } from 'svelte';

	type Props = { href: Path; matches?: string[]; children: Snippet };

	let { href, matches = [], children }: Props = $props();

	const isCurrentPage = $derived(
		[href, ...matches].some((v) => page.url.pathname.match(v))
	);
</script>

<li>
	<a href={resolve(href)} aria-current={isCurrentPage ? 'page' : undefined}>
		{@render children()}
	</a>
</li>

<style>
	a {
		text-decoration: none;
		position: relative;
	}

	[aria-current="page"] {
		color: var(--color-base-light);
	}

	[aria-current="page"]::before {
		content: '';
		position: absolute;
		inset-inline: calc(var(--space-2xs) * -1);
		inset-block: calc(var(--space-3xs) * -1);
		z-index: -1;
		border-radius: var(--border-radius-sm);
		padding-inline: var(--space-2xs);
		padding-block: var(--space-3xs);
		background-color: var(--color-base-dark);
	}

	[aria-current="page"]:focus-visible {
		outline-offset: 0.6rem;
	}
</style>
