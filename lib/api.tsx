import fs from "fs";
import globby from "globby";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { basename, join } from "path";
import readingTime from "reading-time";

const postsDirectory = join(process.cwd(), "content/posts");

export type Post = {
  content: string;
  source: any;
  data: {
    archived: boolean;
    date: Date;
    tags: string[];
    description: string;
    title: string;
    slug: string;
  };
};

export async function queryPost(
  slug: string,
  { queryWithPlugins = false, queryWithContent = true } = {}
) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  let { data, content } = matter(fileContents);
  const remarkPlugins = [...(queryWithPlugins ? [require("remark-slug")] : [])];
  const rehypePlugins = [...(queryWithPlugins ? [require("mdx-prism")] : [])];
  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins,
      rehypePlugins,
    },
  });
  data = {
    ...data,
    date: data.date.toISOString(),
    timeToRead: readingTime(content).text,
  };

  return queryWithContent
    ? {
        data,
        content,
        source,
      }
    : {
        data,
      };
}

export const getPostSlugs = () =>
  globby.sync(`${postsDirectory}/**.md`).map((path) => basename(path));

export async function getAllPosts({
  queryWithPlugins = false,
  queryWithContent = true,
} = {}) {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => queryPost(slug, { queryWithPlugins, queryWithContent }))
  );
  return posts
    .filter((post) => !post.data.archived)
    .sort((post1: Post, post2: Post) =>
      post1.data.date > post2.data.date ? -1 : 1
    );
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = posts.map((post) => post.data.tags).flat(Infinity);
  return Array.from(new Set(tags));
}
