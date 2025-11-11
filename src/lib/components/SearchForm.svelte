<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	type Props = {
		placeholder?: string;
		children: any;
	};

	let { placeholder, children }: Props = $props();

	const q = $derived($page.url.searchParams.get('q') || '');

	async function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.value.trim() === '') {
			const form = target.closest('form');
			if (form) {
				const formData = new FormData(form);
				const params = new URLSearchParams(formData as any);
				await goto(`?${params.toString()}`, { replaceState: true });
			}
		}
	}
</script>

<form oninput={handleInput}>
	<label for="search" class="visually-hidden">
		{@render children()}
	</label>
	<div
		class="sidebar"
		data-dir="rtl"
		style="--gutter: var(--space-2xs); --sidebar-min-inline-size: 80%; max-inline-size: var(--size-15)"
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
