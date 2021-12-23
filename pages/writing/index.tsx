import Link from "next/link";
import { InferGetStaticPropsType } from "next";
import Layout from "../../components/layout";
import { getPostMetadata } from "../../lib/api";

const formatDate = (date: Date) =>
  Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(date));

export const meta = {
  title: "Brandon's Blog",
  description: "Recent blog posts from Brandon Pittman.",
};

export async function getStaticProps() {
  const posts = await getPostMetadata();

  return {
    props: { posts },
  };
}

export default function Writing({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout meta={meta}>
      <div className="prose lg:prose-lg">
        <h1 className="py-8 text-4xl font-bold">Writing</h1>
      </div>

      <ul className="grid gap-6">
        {posts.map((post: any) => (
          <li
            key={post.slug}
            className="flex flex-col sm:flex-row sm:items-center sm:gap-3 focus-within:ring rounded ring-gray-300"
          >
            <span className="block text-gray-500 w-[9.5rem] text-sm sm:text-base sm:text-right">
              {formatDate(post.data.date)}
            </span>
            <Link href={post.data.slug}>
              <a className="block font-bold text-gray-900 focus:outline-none">
                {post.data.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
