<script lang="ts">
	import '../styles/styles.css';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import 'highlight.js/styles/night-owl.css';

	let { children } = $props();

	// Cross-fade between pages where the browser supports it; no-op elsewhere.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
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

<Header />
<main class="region wrapper prose w-full flow">
	{@render children()}
</main>
