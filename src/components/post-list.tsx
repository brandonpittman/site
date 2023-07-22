import { component$, Slot } from "@builder.io/qwik";

export const PostList = component$(() => {
  return (
    <ul class="flow" role="list">
      <Slot />
    </ul>
  );
});
