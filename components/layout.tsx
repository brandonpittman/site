import Footer from "@components/footer";
import Header from "@components/header";
import * as React from "react";
import clsx from "clsx";
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
  const classes = clsx("flex-1 focus:outline-none", className);

  return (
    <>
      <SEO title={meta.title} description={meta.description} />
      <div>
        <div className="container mx-auto flex min-h-screen flex-1 flex-col">
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
            className={clsx(classes, "mx-auto w-full max-w-prose")}
          >
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
