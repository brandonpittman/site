import Layout from "@components/layout";
import { quotes, getRandomQuote } from "../api/stoic";
import RandomStoicQuote from "@components/RandomStoicQuote";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import fs from "fs";

const meta = {
  title: "Random Stoic Quote",
  description: "A small app that outputs a random Stoic quote.",
};

const Stoic = ({ quotes, source }) => {
  const content = hydrate(source);
  return (
    <Layout className="prose dark:prose-dark" meta={meta}>
      <RandomStoicQuote {...quotes} />

      <hr />

      <div>{content}</div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const contentPath = process.cwd() + "/src/components/StoicContext.mdx";
  const source = fs.readFileSync(contentPath, "utf8");
  const mdxSource = await renderToString(source);
  const props = { source: mdxSource, quotes: getRandomQuote(quotes) };
  return {
    props,
  };
}

export default Stoic;
