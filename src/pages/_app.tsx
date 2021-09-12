import "tailwindcss/tailwind.css";
import "../css/dank-mono.css";
import "../css/prism-night-owl.css";

// import { useAnalytics } from "@happykit/analytics";
// import Script from "next/script";
import { ThemeProvider } from "next-themes";
import * as Fathom from "fathom-client";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { MDXProvider } from "@mdx-js/react";
import Image from "next/image";
import Link from "@components/Link";
import Ogp from "@components/Ogp";

const components = {
  Image,
  a: Link,
};

const blacklist = ["/reading"];

const trackPageview = (url: string) => {
  if (!blacklist.includes(url)) Fathom.trackPageview();
};

Router.events.on("routeChangeComplete", trackPageview);

export default function App({ Component, pageProps }) {
  useEffect(() => {
    Fathom.load("EXCJWHRT", {
      excludedDomains: ["vercel.app", "now.sh", "localhost"],
    });
  }, []);

  // useAnalytics({ publicKey: "analytics_pub_361b311602" });

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <MDXProvider components={components}>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/inter.min.css"
          />
          <Ogp />
        </Head>
        {/* <Script
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
         */}
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
}
