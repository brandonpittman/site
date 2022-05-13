import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/cloudflare";
import styles from "./tailwind.css";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useFathom } from "remix-fathom";
import { getSeo } from "~/seo";
import { setPagesContext } from "remix-pages-context";

let [seoMeta, seoLinks] = getSeo();

let sizesApple = [57, 60, 72, 76, 114, 120, 144, 152, 180].map((s) => ({
  rel: "apple-touch-icon",
  sizes: `${s}x${s}`,
  href: `/favicon-${s}x${s}.png`,
}));

let sizesPng = [16, 32, 96, 192].map((s) => ({
  rel: "icon",
  type: "image/png",
  sizes: `${s}x${s}`,
  href: `/favicon-${s}x${s}.png`,
}));
export const links: LinksFunction = () => [
  ...seoLinks,
  { rel: "stylesheet", href: styles },
  { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  ...sizesApple,
  ...sizesPng,
];

export const meta: MetaFunction = () => ({
  ...seoMeta,
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = ({ context }) => {
  setPagesContext(context);
  return null;
};

export default function App() {
  useFathom("EXCJWHRT", {
    includedDomains: [
      "blp.is",
      "www.blp.is",
      "brandonpittman.com",
      "www.brandonpittman.com",
    ],
  });

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="container flex flex-col min-h-screen mx-auto">
        <Header />

        <div className="max-w-prose mx-auto w-full py-4 flex-1">
          <main className="prose lg:prose-lg">
            <Outlet />
          </main>
        </div>

        <Footer />

        <ScrollRestoration />
        <Scripts />
        <script
          data-goatcounter="https://blp.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></script>
        <LiveReload />
      </body>
    </html>
  );
}
