import { json } from "@remix-run/server-runtime";
import { useLoaderData } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/server-runtime";

export type LoaderData = {
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
  return json<LoaderData>(data);
};

export default function Post() {
  const {
    attributes: {
      meta: { title, description },
    },
    html,
  } = useLoaderData() as LoaderData;

  return (
    <>
      <h1>{title}</h1>
      {description ? <p className="lead">{description}</p> : null}
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </>
  );
}
