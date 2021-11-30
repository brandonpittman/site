import OldPostWarning from "@components/OldPostWarning";
import PostMeta from "@components/post_meta";
import Footer from "@components/footer";
import Header from "@components/header";
import * as React from "react";
import clsx from "clsx";
import SEO from "@components/seo";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.text());

export default function Layout({
  className,
  meta,
  filename,
}: {
  children?: React.ReactNode;
  className?: string;
  filename: string;
  meta: {
    title: string;
    description: string;
    date?: string;
  };
  route: string;
}) {
  const classes = clsx("flex-1 focus:outline-none", className);
  const router = useRouter();
  const mdxClasses = clsx("py-8 prose lg:prose-lg", classes);
  const url = `/api/time/${encodeURIComponent(filename)}`;
  const { data: timeToRead } = useSWR(url, fetcher);

  return function Notes({ children }) {
    return router.pathname.startsWith("/writing") ? (
      <>
        <SEO title={meta.title} description={meta.description} />
        <div className="container flex flex-col min-h-screen">
          <a
            href="#skip-content-target"
            className="sr-only m-4 focus:not-sr-only focus:!fixed bg-white rounded-md z-50 shadow left-4 top-4 focus:ring hover:ring focus:outline-none !p-1"
          >
            Skip to main content
          </a>
          <Header />
          <main
            tabIndex={-1}
            id="skip-content-target"
            className={clsx("w-full flex-1 max-w-prose mx-auto")}
          >
            <div className="py-8 grid gap-12">
              <div className="grid gap-2">
                <h1 className="text-gray-900 text-5xl font-bold ">
                  {meta.title}
                </h1>
                <PostMeta post={{ data: { ...meta, timeToRead } }} />
              </div>

              <OldPostWarning date={meta.date} />

              <p className="pl-4 border-l-4 border-blue-500 border-opacity-50 lead">
                {meta.description}
              </p>

              <div className="overflow-auto prose lg:prose-lg">{children}</div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    ) : (
      <>
        <SEO title={meta.title} description={meta.description} />
        <div className="container flex flex-col min-h-screen">
          <a
            href="#skip-content-target"
            className="sr-only m-4 focus:not-sr-only focus:!fixed bg-white rounded-md z-50 shadow left-4 top-4 focus:ring hover:ring focus:outline-none !p-1"
          >
            Skip to main content
          </a>
          <Header />
          <main
            tabIndex={-1}
            id="skip-content-target"
            className={clsx("w-full flex-1 max-w-prose mx-auto")}
          >
            <div className={mdxClasses}>{children}</div>
          </main>
          <Footer />
        </div>
      </>
    );
  };
}
