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
        <div className="container mx-auto min-h-screen flex flex-col flex-1">
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
            className={clsx(classes, "max-w-prose w-full mx-auto")}
          >
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
