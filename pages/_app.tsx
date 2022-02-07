import "tailwindcss/tailwind.css";
import "../css/dank-mono.css";
import "../css/prism-night-owl.css";

import Router from "next/router";
import Ogp from "@components/Ogp";
import MDXProvider from "@components/MDXProvider";
import { useFathom, trackPageview } from "@/hooks/useFathom";

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
