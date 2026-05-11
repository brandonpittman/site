<script lang="ts">
	interface Props {
		name?: string;
		date?: Date;
		location?: string;
	}

	let { name = 'B. Pittman', date = new Date(), location = 'Japan' }: Props = $props();

	function ordinal(n: number): string {
		const s = ['th', 'st', 'nd', 'rd'];
		const v = n % 100;
		return n + (s[(v - 20) % 10] || s[v] || s[0]);
	}

	const formatted = $derived.by(() => {
		const day = ordinal(date.getDate());
		const month = date.toLocaleString('en-US', { month: 'long' });
		const year = date.getFullYear();
		return `${day} ${month} ${year}`;
	});
</script>

<div class="signature">
	<span class="location">{location}</span>
	<div class="dateline">
		<span class="date">{formatted}</span>
		<span class="name">{name}</span>
	</div>
</div>

<style>
	.signature {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
		font-style: italic;
		margin-block-start: 2em;
	}

	.location {
		text-align: start;
	}

	.dateline {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.date {
		margin-inline-end: auto;
	}

	.name {
		font-family: serif;
		font-size: 1.1em;
		margin-inline-start: auto;
	}
</style>
