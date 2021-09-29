import "tailwindcss/tailwind.css";
import "../css/dank-mono.css";
import "../css/prism-night-owl.css";

import { ThemeProvider } from "next-themes";
import splitbee from "@splitbee/web";
import * as Fathom from "fathom-client";
import Router from "next/router";
import React, { useEffect } from "react";
import Ogp from "@components/Ogp";
import MDXProvider from "@components/MDXProvider";

const blacklist = ["/reading"];

const trackPageview = (url: string) => {
  if (!blacklist.includes(url)) Fathom.trackPageview();
};

Router.events.on("routeChangeComplete", trackPageview);

export default function App({ Component, pageProps }) {
  useEffect(() => {
    splitbee.init({
      scriptUrl: "/bee.js",
      apiUrl: "/_hive",
    });
  });
  useEffect(() => {
    Fathom.load("EXCJWHRT", {
      excludedDomains: ["vercel.app", "now.sh", "localhost"],
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <MDXProvider>
        <Ogp />
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
}
