<script lang="ts">
	let { data } = $props();
</script>

<h1>{data.meta.title}</h1>

{@html data.content}
