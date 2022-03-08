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
      <Ogp />{" "}
      <MDXProvider>
        <div className="h-8 w-screen bg-[linear-gradient(180deg,#005BBB_49.9%,#FFD500_50%)]">
          <p className="sr-only">Long live, Ukraine.</p>
        </div>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  );
}
