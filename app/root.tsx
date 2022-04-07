import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import styles from "./tailwind.css";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useFathom } from "remix-fathom";

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
  { rel: "stylesheet", href: styles },
  { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  ...sizesApple,
  ...sizesPng,
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Brandon Pittman's Blog",
  description:
    "Where Brandon Pittman talks about himself and the things he believes in.",
  viewport: "width=device-width,initial-scale=1",
});

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
        <LiveReload />
      </body>
    </html>
  );
}
