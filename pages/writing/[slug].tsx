import Layout from "@components/layout";
import OldPostWarning from "@components/OldPostWarning";
import PostMeta from "@components/post_meta";
import { getAllPosts, queryPost } from "@lib/api";
import { MDXRemote } from "next-mdx-remote";
import CustomLink from "@components/Link";
import AmazonLink from "@components/AmazonLink";

const components = {
  a: CustomLink,
  amazon: AmazonLink,
};

export default function Post({ source, data }) {
  const meta = { title: data.title, description: data.description };

  return (
    <Layout meta={meta}>
      <div className="py-8 grid gap-12">
        <div className="grid gap-2">
          <h1 className="text-gray-900 text-5xl font-bold ">{data.title}</h1>
          <PostMeta post={{ data }} />
        </div>

        <OldPostWarning date={data.date} />

        <p className="pl-4 border-l-4 border-blue-500 border-opacity-50 lead">
          {data.description}
        </p>

        <div className="overflow-auto prose lg:prose-lg">
          <MDXRemote {...source} components={components} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { data, content, source } = await queryPost(params.slug, {
    queryWithPlugins: true,
  });

  return {
    props: {
      source,
      content,
      data,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.data.slug,
        },
      };
    }),
    fallback: false,
  };
}
