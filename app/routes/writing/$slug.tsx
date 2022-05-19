import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";

type LoaderData = {
  attributes: {
    meta: {
      title: string;
      description: string;
    };
  };
  html: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(
    `https://github-md.com/brandonpittman/site/main/blog/${params.slug}.md`
  );
  const data: LoaderData = await res.json();
  console.log({ data });
  return json<LoaderData>(data);
};
export default function Post() {
  const { attributes, html } = useLoaderData() as LoaderData;

  return (
    <>
      <h1>{attributes.meta.title}</h1>
      <p className="lead">{attributes.meta.description}</p>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </>
  );
}
