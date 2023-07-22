import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useLoader = routeLoader$(async (e) => {
  const modules = import.meta.glob(`/src/content/notes/*.md`);

  const note = await modules[`/src/content/notes/${e.params.slug}.md`]();

  console.log(note);

  // const books = await asyncMap(Object.keys(modules), async (path) => {
  //   const data = (await modules[path]()) as DocumentHeadProps;
  //   const chunks = path.split(".md")[0].split("/");
  //   const slug = chunks[chunks.length - 1];

  //   return {
  //     title: data.frontmatter.title || "",
  //     author: data.frontmatter.author,
  //     status: data.frontmatter.status,
  //     slug,
  //   };
  // });
  return e.params.slug;
});

export default component$(() => {
  const slug = useLoader();
  return <p>{slug.value}</p>;
});
