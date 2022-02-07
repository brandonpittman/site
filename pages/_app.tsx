import "tailwindcss/tailwind.css";
import "../css/dank-mono.css";
import "../css/prism-night-owl.css";

import * as Fathom from "fathom-client";
import Router from "next/router";
import Ogp from "@components/Ogp";
import MDXProvider from "@components/MDXProvider";
import useFathom from "@/hooks/useFathom";

const blacklist = ["/reading/pinboard"];

const trackPageview = (url: string) => {
  if (!blacklist.some((v) => url.startsWith(v))) Fathom.trackPageview();
};

Router.events.on("routeChangeComplete", trackPageview);

export default function App({ Component, pageProps }) {
  useFathom();

  return (
    <>
      <Ogp />
      <MDXProvider>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  );
}
