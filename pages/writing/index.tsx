import Link from "next/link";
import Layout from "../../components/layout";
import { Post, getAllPosts } from "../../lib/api";

export const meta = {
  title: "Brandon's Blog",
  description: "Recent blog posts from Brandon Pittman.",
};

export async function getStaticProps() {
  const posts = await getAllPosts({ queryWithContent: false });

  return {
    props: { posts },
  };
}

export default function Writing({ posts }: { posts: Post[] }) {
  return (
    <Layout meta={meta}>
      <div className="prose lg:prose-lg">
        <h1 className="pt-16 text-4xl font-bold">Writing</h1>
      </div>

      <ul className="mt-16 grid gap-4">
        {posts.map((post) => (
          <li key={post.data.slug}>
            <Link href="/writing/[slug]" as={"/writing/" + post.data.slug}>
              <a className="font-bold text-gray-500 rounded-md focus:outline-none focus:text-gray-900 hover:text-gray-900">
                {post.data.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
