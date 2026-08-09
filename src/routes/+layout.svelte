<script lang="ts">
	import '../styles/styles.css';
	// Plain component, not an island: the header has no interactivity of its own. It was only
	// hydrated to keep aria-current fresh while persisted, and persisting is gone -- ogygia swaps
	// in the server's markup on each navigation, so the current-page marker is correct for free.
	import Header from '$lib/components/Header.svelte';
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

<Header />

<main class="region wrapper prose w-full flow">
	{@render children()}
</main>
