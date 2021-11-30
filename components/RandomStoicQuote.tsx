import * as React from "react";
import clsx from "clsx";
import { StoicProps } from "pages/api/stoic";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function RandomStoicQuote({ quote }: StoicProps) {
  const { data, mutate, isValidating } = useSWR("/api/stoic", fetcher, {
    fallbackData: quote,
  });

  const { text, author, source } = data;

  return (
    <>
      <h2 className="flex items-center gap-1">
        <span>Random Stoic Quote</span>
        <button
          className={clsx(
            isValidating ? "animate-spin-reverse" : "focus:ring",
            "px-2 py-1 my-4 text-xs font-medium border border-transparent rounded-md focus:outline-none"
          )}
          onClick={() => mutate()}
        >
          <span className="sr-only">Refresh quote</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </h2>
      <blockquote className="whitespace-pre-line">{text}</blockquote>
      <i>
        {author} {source ? `— ${source}` : null}
      </i>
    </>
  );
}
