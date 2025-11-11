import { component$, Slot } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const head = useDocumentHead();
  return (
    <>
      {head.frontmatter.date ? (
        <p class="color-gray-light text-xs" style="margin-block-start: 0">
          Last updated on {head.frontmatter.date}
        </p>
      ) : null}
      <Slot />
    </>
  );
});
