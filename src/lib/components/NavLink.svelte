<script lang="ts">
	import { page } from '$app/state';

	type Props = {
		href: string;
		matches?: string[];
		children: any;
	};

	let { href, matches = [], children }: Props = $props();

	// `href` comes from resolve(), which returns a path relative to the current page
	// (`./about` at the root, `../about` under /notes/[slug]) because kit.paths.relative
	// defaults to true. Matching that against pathname directly never hits -- as a regex,
	// `./about` demands a character before `/about`. Normalise to an absolute pathname
	// first, then keep the original substring semantics so `/notes` stays current on
	// `/notes/[slug]`.
	const isCurrentPage = $derived(
		[new URL(href, page.url).pathname, ...matches].some((v) => page.url.pathname.match(v))
	);
</script>

<li>
	<!-- `href` arrives already resolved from the call site (see Header.svelte), but eslint
	     can't trace that through a prop. -->
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a {href} aria-current={isCurrentPage ? 'page' : undefined}>
		{@render children()}
	</a>
</li>

<style>
	a {
		text-decoration: none;
		position: relative;
	}

	[aria-current='page'] {
		color: var(--color-base-light);
	}

	[aria-current='page']::before {
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

	[aria-current='page']:focus-visible {
		outline-offset: 0.6rem;
	}
</style>
