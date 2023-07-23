import { component$, Slot } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const head = useDocumentHead();

  const platform = head.frontmatter.platform;
  const genre = head.frontmatter.genre;

  return (
    <>
      <p class="color-gray-light" style="margin-block-start: -.125rem">
        {platform}
        {genre ? ` · ${genre}` : ""}
      </p>
      <Slot />
    </>
  );
});
