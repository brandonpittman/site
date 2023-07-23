import { component$, Slot } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const head = useDocumentHead();

  const author = head.meta.find(({ name }) => name === "author")?.content;
  const translator = head.frontmatter.translator;
  const genre = head.frontmatter.genre;

  return (
    <>
      <p class="color-gray-light" style="margin-block-start: -.125rem">
        {author}
        {translator ? ` · ${translator}` : ""}
        {genre ? ` · ${genre}` : ""}
      </p>
      <Slot />
    </>
  );
});
