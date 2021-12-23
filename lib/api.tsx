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

export async function getPostMetadata() {
  const files = fs.readdirSync(join(process.cwd(), "pages", "writing"));
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      let fm = matter(
        fs.readFileSync(join(process.cwd(), "pages", "writing", file), "utf8")
      );
      return {
        content: fm.content,
        data: {
          ...fm.data,
          slug: `/writing/${basename(file, ".mdx")}`,
        },
      };
    })
    .filter((post: Post) => !post.data.archived)
    .sort((post1: any, post2: any) =>
      post1.data.date > post2.data.date ? -1 : 1
    )
    .map((post: Post) => ({
      content: post.content,
      data: {
        ...post.data,
        date: post.data.date.toISOString(),
        timeToRead: readingTime(post.content).text,
      },
    }));

  return posts;
}
