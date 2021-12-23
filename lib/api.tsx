import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import readingTime from "reading-time";

export async function getPostMetadata() {
  const files = fs.readdirSync(join(process.cwd(), "pages", "writing"));
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) =>
      matter(
        fs.readFileSync(join(process.cwd(), "pages", "writing", file), "utf8")
      )
    )
    .filter((post) => !post.data.archived)
    .sort((post1: any, post2: any) =>
      post1.data.date > post2.data.date ? -1 : 1
    )
    .map((post) => ({
      content: post.content,
      data: {
        ...post.data,
        date: post.data.date.toISOString(),
        timeToRead: readingTime(post.content).text,
      },
    }));

  return posts;
}
