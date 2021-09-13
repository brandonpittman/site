import Link from "next/link";
import Layout from "../../components/layout";
import { getAllPosts } from "../../lib/api";

export const meta = {
  title: "Brandon's Blog",
  description: "Recent blog posts from Brandon Pittman.",
};

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: { posts },
  };
}

export default function Writing({ posts }) {
  return (
    <Layout className="max-w-3xl mx-auto" meta={meta}>
      <h1 className="text-4xl font-bold">Writing</h1>

      <ul className="mt-16 grid gap-4">
        {posts.map((post) => (
          <li key={post.data.slug} className="">
            <Link href="/writing/[slug]" as={"/writing/" + post.data.slug}>
              <a className="font-bold text-gray-500 rounded-md focus:outline-none dark:focus:text-gray-100 focus:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100">
                {post.data.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
