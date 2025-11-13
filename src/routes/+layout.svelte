<script lang="ts">
	import '../styles/styles.css';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	// Get title from page data meta or use default
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
