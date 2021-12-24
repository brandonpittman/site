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
                <PostMeta post={{ data: meta }} />
              </div>

              <OldPostWarning date={meta.date} />

              {meta.description ? (
                <p className="pl-4 border-l-4 border-blue-500 border-opacity-50 lead">
                  {meta.description}
                </p>
              ) : null}

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
