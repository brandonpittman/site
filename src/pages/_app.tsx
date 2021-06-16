import "tailwindcss/tailwind.css";
import "../css/dank-mono.css";
import "../css/prism-night-owl.css";

import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { FormspreeProvider } from "@formspree/react";
import * as Fathom from "fathom-client";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { MDXProvider } from "@mdx-js/react";
import Image from "next/image";
import Link from "@components/Link";

const components = {
  Image,
  a: Link,
};

Router.events.on("routeChangeComplete", () => {
  Fathom.trackPageview();
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    Fathom.load("EXCJWHRT", {
      excludedDomains: ["vercel.app", "now.sh", "localhost"],
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <MDXProvider components={components}>
        <FormspreeProvider project="1543675199252070229">
          <Head>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/inter.min.css"
            />

            <link rel="manifest" href="/manifest.json" />
            <link
              rel="apple-touch-icon"
              sizes="57x57"
              href="/favicon-57x57.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="60x60"
              href="/favicon-60x60.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="72x72"
              href="/favicon-72x72.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="76x76"
              href="/favicon-76x76.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="114x114"
              href="/favicon-114x114.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="120x120"
              href="/favicon-120x120.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="144x144"
              href="/favicon-144x144.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="152x152"
              href="/favicon-152x152.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/favicon-180x180.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="96x96"
              href="/favicon-96x96.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="192x192"
              href="/favicon-192x192.png"
            />
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta
              name="msapplication-TileImage"
              content="/favicon-144x144.png"
            />
            <meta name="msapplication-config" content="/browserconfig.xml" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#ffffff" />
          </Head>
          <Script
            strategy="lazyOnload"
            data-name="BMC-Widget"
            data-cfasync="false"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-id="blp"
            data-description="Support me on Buy me a coffee!"
            data-message=""
            data-color="#5F7FFF"
            data-position="Right"
            data-x_margin="16"
            data-y_margin="16"
          ></Script>
          <Component {...pageProps} />
        </FormspreeProvider>
      </MDXProvider>
    </ThemeProvider>
  );
}
