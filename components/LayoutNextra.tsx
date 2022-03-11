import OldPostWarning from "@components/OldPostWarning";
import PostMeta from "@components/post_meta";
import Footer from "@components/footer";
import Header from "@components/header";
import * as React from "react";
import clsx from "clsx";
import SEO from "@components/seo";
import { useRouter } from "next/router";

export default function Layout({
  className,
  meta,
  route,
}: {
  className?: string;
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

  return function Notes({ children }) {
    return router.pathname.startsWith("/writing") ? (
      <>
        <SEO title={meta.title} description={meta.description} />
        <div className="container flex min-h-screen flex-col">
          <a
            href="#skip-content-target"
            className="sr-only left-4 top-4 z-50 m-4 rounded-md bg-white !p-1 shadow hover:ring focus:not-sr-only focus:!fixed focus:outline-none focus:ring"
          >
            Skip to main content
          </a>
          <Header />
          <main
            tabIndex={-1}
            id="skip-content-target"
            className={clsx("mx-auto w-full max-w-prose flex-1")}
          >
            <div className="grid gap-12 py-8">
              <div className="grid gap-2">
                <h1 className="text-5xl font-bold text-gray-900 ">
                  {meta.title}
                </h1>
                <PostMeta post={{ data: meta }} />
              </div>
              <OldPostWarning date={meta.date} />
              {meta.description ? (
                <p className="lead border-l-4 border-blue-500 border-opacity-50 pl-4">
                  {meta.description}
                </p>
              ) : null}
              <div className="prose overflow-auto lg:prose-lg">{children}</div>
              <hr />

              <p>
                Have thoughts about what you just read?
                <span> </span>
                <a
                  href={`mailto:hey@blp.is?subject=${meta.title}`}
                  className="text-gray-900 underline"
                >
                  Send me an email.
                </a>
              </p>
            </div>
          </main>
          <Footer />
        </div>
      </>
    ) : (
      <>
        <SEO title={meta.title} description={meta.description} />
        <div className="container flex min-h-screen flex-col">
          <a
            href="#skip-content-target"
            className="sr-only left-4 top-4 z-50 m-4 rounded-md bg-white !p-1 shadow hover:ring focus:not-sr-only focus:!fixed focus:outline-none focus:ring"
          >
            Skip to main content
          </a>
          <Header />
          <main
            tabIndex={-1}
            id="skip-content-target"
            className={clsx("mx-auto w-full max-w-prose flex-1")}
          >
            <div className={mdxClasses}>{children}</div>
          </main>
          <Footer />
        </div>
      </>
    );
  };
}
