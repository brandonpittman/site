import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import { getSeoMeta } from "~/seo";

import * as OnDealingWithOthers from "~/routes/writing/on-dealing-with-others.mdx";
import * as OnAwkLoops from "~/routes/writing/on-awk-loops.mdx";
import * as OnBecomingStoic from "~/routes/writing/on-becoming-a-stoic.mdx";
import * as OnEmbracingFinitude from "~/routes/writing/on-embracing-your-finitude.mdx";
import * as OnKeepingNodeScriptsAlive from "~/routes/writing/on-keeping-node-scripts-alive.mdx";
import * as OnLearningFunctionalProgramming from "~/routes/writing/on-learning-functional-programming.mdx";
import * as OnMinimalistFinancialTracking from "~/routes/writing/on-minimalist-financial-tracking.mdx";
import * as OnMinimalstGtd from "~/routes/writing/on-minimalist-gtd.mdx";
import * as OnProductivityAndPhilosophy from "~/routes/writing/on-productivity-and-philosophy.mdx";
import * as OnSquashingCommits from "~/routes/writing/on-squashing-commits.mdx";
import * as OnTheDomainsOfLife from "~/routes/writing/on-the-domains-of-life.mdx";
import * as OnLearningHaskell from "~/routes/writing/on-learning-haskell.mdx";
import * as OnRemixSlowTransitions from "~/routes/writing/on-remix-slow-transitions.mdx";

const formatDate = (date: Date) =>
  Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(date));

export let meta = () => ({
  ...getSeoMeta({
    title: "Writing",
    description: "Recent blog posts from Brandon Pittman.",
  }),
});

type Post = {
  filename: string;
  attributes: {
    date: Date;
    meta: {
      title: string;
      description: string;
    };
  };
};

function postFromModule(mod: Post) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    ...mod.attributes,
  };
}

export async function loader() {
  return json(
    [
      postFromModule(OnDealingWithOthers),
      postFromModule(OnAwkLoops),
      postFromModule(OnLearningFunctionalProgramming),
      postFromModule(OnBecomingStoic),
      postFromModule(OnEmbracingFinitude),
      postFromModule(OnKeepingNodeScriptsAlive),
      postFromModule(OnTheDomainsOfLife),
      postFromModule(OnSquashingCommits),
      postFromModule(OnProductivityAndPhilosophy),
      postFromModule(OnMinimalstGtd),
      postFromModule(OnMinimalistFinancialTracking),
      postFromModule(OnLearningHaskell),
      {
        date: new Date(2022, 4, 15),
        slug: "on-use-presence",
        meta: { title: "On Use Presence" },
      },
      postFromModule(OnRemixSlowTransitions),
    ].sort((a, b) => b.date.getTime() - a.date.getTime())
  );
}

export default function Writing() {
  let posts = useLoaderData();

  return (
    <>
      <h1>Writing</h1>

      <ul className="!pl-0">
        {posts.map((post: any) => (
          <li
            key={post.slug}
            className="flex flex-col rounded ring-gray-300 focus-within:ring sm:flex-row sm:items-center sm:gap-3"
          >
            <span className="block w-[9.5rem] text-sm text-gray-500 sm:text-right sm:text-base">
              {formatDate(post.date)}
            </span>
            <Link
              to={post.slug}
              prefetch="intent"
              className="block font-bold text-gray-900 no-underline focus:outline-none"
            >
              {post.meta.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
