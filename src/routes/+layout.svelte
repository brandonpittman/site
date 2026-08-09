<script lang="ts">
	import '../styles/styles.css';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/state';
	import { goto, onNavigate, beforeNavigate } from '$app/navigation';
	import { OgygiaRouter } from 'ogygia';
	import 'highlight.js/styles/night-owl.css';
	import { PressedKeys } from 'runed';

	let { children } = $props();

	// Routes opted into ogygia islands (per-route `csr = false`). Kit's client router doesn't
	// know about `csr` at all — that flag only controls the server's initial HTML/hydration
	// output — so a soft client-side nav from any hydrated page straight into one of these
	// would otherwise render the route's component tree via the client bundle, where ogygia's
	// island transform has stubbed out the hydrate-marked component (it assumes csr=false
	// routes are only ever reached via a fresh SSR load). Force a hard reload instead so the
	// island renders correctly. Add a route's id here when it becomes an island.
	const ISLAND_ROUTE_IDS = new Set(['/', '/notes/[slug]']);

	beforeNavigate((navigation) => {
		const to = navigation.to;
		if (to?.route.id && ISLAND_ROUTE_IDS.has(to.route.id) && to.url) {
			navigation.cancel();
			location.href = to.url.href;
		}
	});

	// Cross-fade between pages where the browser supports it; no-op elsewhere. Only fires for
	// soft (Kit-hydrated-to-hydrated) navigations — the beforeNavigate guard above forces a
	// full reload into island routes, which are plain MPA loads by design.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const keys = new PressedKeys();
	keys.onKeys(['c', 'm', 's'], () => {
		goto('/admin');
	});

	// Get title from page data meta or use default
	// TODO: Fix global metadata handling
	const baseName = 'Brandon Pittman';
	const titleSuffix = ' | ' + baseName;

	const pageTitle = $derived(page.data.title || '');
</script>

<svelte:head>
	<title>{pageTitle ? pageTitle + titleSuffix : baseName}</title>
</svelte:head>

<OgygiaRouter />

<Header />
<main class="region wrapper prose w-full flow">
	{@render children()}
</main>
