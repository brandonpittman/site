import Footer from "@components/footer";
import Header from "@components/header";
import * as React from "react";
import clsx from "clsx";
import SEO from "@components/seo";
import { useRouter } from "next/router";

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
  const classes = clsx(
    "flex-1 w-full container p-4 mx-auto sm:p-8 focus:outline-none",
    className
  );

  const mdxClasses = clsx("prose lg:prose-lg dark:prose-dark", classes);

  if (pageMap) {
    return function Notes({ children }) {
      return (
        <>
          <SEO title={meta.title} description={meta.description} />
          <div className="flex flex-col min-h-screen text-lg bg-gray-50 dark:bg-black dark:text-gray-50">
            <a
              href="#skip-content-target"
              className="sr-only m-4 focus:not-sr-only focus:!fixed bg-white rounded-md z-50 shadow left-4 top-4 focus:ring hover:ring focus:outline-none !p-1"
            >
              Skip to main content
            </a>
            <Header />
            <main tabIndex={-1} id="skip-content-target" className={mdxClasses}>
              {children}
            </main>
            <Footer />
          </div>
        </>
      );
    };
  } else {
    return (
      <>
        <SEO title={meta.title} description={meta.description} />
        <div className="flex flex-col min-h-screen text-lg bg-gray-50 dark:bg-black dark:text-gray-50">
          <a
            href="#skip-content-target"
            className="sr-only m-4 focus:not-sr-only focus:!fixed bg-white rounded-md z-50 shadow left-4 top-4 focus:ring hover:ring focus:outline-none !p-1"
          >
            Skip to main content
          </a>
          <Header />
          <main tabIndex={-1} id="skip-content-target" className={classes}>
            {children}
          </main>
          <Footer />
        </div>
      </>
    );
  }
}
