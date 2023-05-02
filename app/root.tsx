import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/cloudflare";
import styles from "./tailwind.css";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

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
  { rel: "me", href: "https://github.com/brandonpittman" },
  { rel: "webmention", href: "https://webmention.io/blp.is/webmention" },
  { rel: "pingback", href: "https://webmention.io/blp.is/xmlrpc" },
  ...sizesApple,
  ...sizesPng,
];

export default function App() {
  let location = useLocation();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      {location.pathname === "/distracted" ? (
        <body>
          <Outlet />
        </body>
      ) : (
        <body className="container flex flex-col min-h-screen mx-auto">
          <Header />

          <div className="flex-1 w-full py-4 mx-auto max-w-prose">
            <main className="prose lg:prose-lg">
              <Outlet />
            </main>
          </div>

          <Footer />

          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      )}
    </html>
  );
}
