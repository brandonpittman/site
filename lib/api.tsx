import fs from "fs";
import matter from "gray-matter";
import { basename, join } from "path";
import readingTime from "reading-time";

export type Post = {
  data: {
    archived?: boolean;
    slug: string;
    title: string;
    date: Date;
    timeToRead?: string;
  };
  content: string;
};

const endsWithMdx = (file: string) => file.endsWith(".mdx");
const isNotArchived = (post: Post) => !post.data.archived;
const byDate = (a: Post, b: Post) =>
  b.data.date.getTime() - a.data.date.getTime();
const serializeable = (post: Post) => ({
  content: post.content,
  data: {
    ...post.data,
    date: post.data.date.toISOString(),
    timeToRead: readingTime(post.content).text,
  },
});

const withPath = (file: string) =>
  join(process.cwd(), "pages", "writing", file);
const withContent = (file: string) => fs.readFileSync(withPath(file), "utf8");
const withSlug = (file: string) => {
  let fm = matter(withContent(file));
  return {
    content: fm.content,
    data: {
      ...fm.data,
      slug: `/writing/${basename(file, ".mdx")}`,
    },
  };
};

export async function getPostMetadata() {
  const files = fs.readdirSync(join(process.cwd(), "pages", "writing"));
  const posts = files
    .filter(endsWithMdx)
    .map(withSlug)
    .filter(isNotArchived)
    .sort(byDate)
    .map(serializeable);

  return posts;
}
