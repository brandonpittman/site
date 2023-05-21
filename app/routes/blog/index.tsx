import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";

const formatDate = (date: Date) =>
  Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(date));

export let meta = () => [
  {
    title: "Blog",
  },
  {
    name: "description",
    content: "Recent blog posts from Brandon Pittman.",
  },
];

export async function loader() {
  return json(
    [
      {
        date: new Date(2023, 4, 21),
        slug: "on-vanilla-extract",
        meta: { title: "On Vanilla Extract" },
      },
      {
        date: new Date(2022, 7, 8),
        slug: "on-learning-latin",
        meta: { title: "On Learning Latin" },
      },
      {
        date: new Date(2022, 11, 23),
        slug: "on-deferring-documents",
        meta: { title: "On Deferring Documents" },
      },
      {
        date: new Date(2022, 6, 27),
        slug: "on-use-portal",
        meta: { title: "On usePortal" },
      },
      {
        date: new Date(2022, 4, 15),
        slug: "on-use-presence",
        meta: { title: "On usePresence" },
      },
      {
        date: new Date(2022, 2, 4),
        slug: "on-minimalist-financial-tracking",
        meta: { title: "On Minimalist Finance Tracking" },
      },
      {
        date: new Date(2021, 8, 21),
        slug: "on-the-domains-of-life",
        meta: { title: "On the Domains of Life" },
      },
    ].sort((a, b) => b.date.getTime() - a.date.getTime())
  );
}

export default function Blog() {
  let posts = useLoaderData();

  return (
    <div>
      <h1>Blog</h1>

      <ul className="!pl-0">
        {posts.map((post: any) => (
          <li
            key={post.slug}
            className="flex flex-col rounded ring-gray-300 focus-within:ring sm:flex-row sm:items-center sm:gap-3"
          >
            <span className="block w-[9.5rem] text-sm text-gray-500 whitespace-nowrap sm:text-right sm:text-base">
              {formatDate(post.date)}
            </span>
            <Link
              to={post.slug}
              prefetch="intent"
              className="block font-bold text-gray-900 no-underline focus:outline-none"
            >
              {post.meta.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
