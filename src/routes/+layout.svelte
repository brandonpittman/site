<script lang="ts">
	import '../styles/styles.css';
	// An island because it's persisted: persisting discards the incoming SSR markup for the
	// header, so without JS its aria-current would freeze on whichever page you first landed on.
	// Hydrated, NavLink's $derived re-reads page.url -- which ogygia refreshes from its page seed
	// on every swap -- so the current-page marker stays correct.
	import Header from '$lib/components/Header.svelte' with { hydrate: 'load' };
	import { page } from '$app/state';
	import { OgygiaRouter } from 'ogygia';
	import 'highlight.js/styles/night-owl.css';

	let { children } = $props();

	// Get title from page data meta or use default
	// TODO: Fix global metadata handling
	const baseName = 'Brandon Pittman';
	const titleSuffix = ' | ' + baseName;

	const pageTitle = $derived(page.data.title || '');
</script>

<svelte:head>
	<title>{pageTitle ? pageTitle + titleSuffix : baseName}</title>
</svelte:head>

<!-- Owns client-side navigation and view transitions now that Kit's router is gone. -->
<OgygiaRouter />

<!-- Keeps the live header node across SPA body swaps instead of rebuilding it each navigation.
     The attribute wraps the island region rather than sitting inside it, which is what lets
     ogygia mark the region as preserved during the move.
     Deliberately NOT display:contents: body is a flex column, and `contents` relies on the
     browser hoisting children into that flex container, which Safari gets wrong -- leaving the
     region inline and the header invisible. A plain block wrapper stretches as a flex item
     exactly like the header used to.
     This does NOT preserve focus -- relocating a focused element blurs it, so keyboard focus
     still resets to body on navigation, same as without persist. -->
<div data-ogygia-persist="header">
	<Header />
</div>

<main class="region wrapper prose w-full flow">
	{@render children()}
</main>
