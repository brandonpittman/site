import Footer from "@components/footer";
import Header from "@components/header";
import * as React from "react";
import { cx } from "@/styles";
import SEO from "@components/seo";

export default function Layout({
  children,
  className,
  meta,
}: {
  children?: React.ReactNode;
  className?: string;
  meta: {
    title: string;
    description: string;
  };
}) {
  const classes = cx(
    "flex-1 w-full container p-4 mx-auto sm:p-8 focus:outline-none",
    className
  );

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
