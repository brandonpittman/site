import Layout from "@components/layout";
import { quotes, getRandomQuote } from "../api/stoic";
import RandomStoicQuote from "@components/RandomStoicQuote";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import fs from "fs";

const meta = {
  title: "Random Stoic Quote",
  description: "A small app that outputs a random Stoic quote.",
};

const Stoic = ({ quotes, source }) => {
  return (
    <Layout className="prose dark:prose-dark" meta={meta}>
      <RandomStoicQuote {...quotes} />

      <hr />

      <div>
        <MDXRemote {...source} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const contentPath = process.cwd() + "/src/components/StoicContent.mdx";
  const source = fs.readFileSync(contentPath, "utf8");
  const mdxSource = await serialize(source);
  const props = { source: mdxSource, quotes: getRandomQuote(quotes) };
  return {
    props,
  };
}

export default Stoic;
