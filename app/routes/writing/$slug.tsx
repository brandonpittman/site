import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { readFileSync } from "~/helpers/fs.server";

export const loader: LoaderFunction = ({ params }) => {
  let content = readFileSync(
    `${process.cwd()}/app/content/${params.slug}.mdx`,
    "utf8"
  ).trim();

  return content;
};

export default function Post() {
  let content = useLoaderData();
  return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
}
