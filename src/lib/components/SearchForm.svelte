<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	type Props = {
		placeholder?: string;
		children: Snippet;
	};

	let { placeholder, children }: Props = $props();

	const q = $derived(page.url.searchParams.get('q') || '');
</script>

<form>
	<label for="search" class="visually-hidden">
		{@render children()}
	</label>
	<div
		class="sidebar"
		data-dir="rtl"
		style="--gutter: var(--space-2xs); --sidebar-min-inline-size: 80%; max-inline-size: 30rem"
	>
		<input
			autofocus
			value={q}
			id="search"
			type="search"
			name="q"
			{placeholder}
		/>
		<button type="submit" class="cta"> Search </button>
	</div>
</form>
