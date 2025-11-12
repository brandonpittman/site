<script lang="ts">
  import { page } from "$app/state";
  import { getNote } from "../notes.remote";

  const slug = page.params.slug;
  const note = await getNote(slug);
</script>

<svelte:head>
  {#if note.metadata.title}
    <title>{note.metadata.title} | Brandon Pittman</title>
    {#if note.metadata.description}
      <meta name="description" content={note.metadata.description} />
    {/if}
  {/if}
</svelte:head>

{#if note}
  <article class="prose flow">
    <h1>{note.metadata.title}</h1>
    <note.content />
  </article>
{/if}
