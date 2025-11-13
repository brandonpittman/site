<script lang="ts">
	import { page } from '$app/state';
	import { getNote } from '../notes.remote';

	let param = $derived(page.params.slug);
	let note = $derived(await getNote(param!));
</script>

<h1>{note.meta.title}</h1>

{@html note.content}
