import { component$, Slot } from "@builder.io/qwik";

export const NoteList = component$(() => {
  return (
    <ul class="flow" role="list">
      <Slot />
    </ul>
  );
});
