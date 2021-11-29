import Footer from "@components/footer";
import Header from "@components/header";
import * as React from "react";
import clsx from "clsx";
import SEO from "@components/seo";

export default function Layout({
  children,
  className,
  meta,
  pageMap,
}: {
  children?: React.ReactNode;
  className?: string;
  meta: {
    title: string;
    description: string;
  };
  pageMap?: any;
}) {
  const classes = clsx("flex-1 focus:outline-none", className);

  const mdxClasses = clsx("py-8 prose lg:prose-lg", classes);

  return function Notes({ children }) {
    return (
      <>
        <SEO title={meta.title} description={meta.description} />
        <div className="flex flex-col container min-h-screen">
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
