import nextPwa from "next-pwa";
import withPlugins from "next-compose-plugins";
import withSvgr from "next-svgr";
import mdxPrism from "mdx-prism";
import nextMdx from "@next/mdx";
import remarkExternalLinks from "remark-external-links";
import remarkSlug from "remark-slug";
import remarkPrism from "remark-prism";

const withPWA = nextPwa({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
  },
});
const withMdx = nextMdx({
  options: {
    rehypePlugins: [mdxPrism],
    remarkPlugins: [remarkExternalLinks, remarkSlug, remarkPrism],
  },
});

export default withPlugins([withPWA, withMdx, withSvgr], {
  experimental: {
    urlImports: ["https://cdn.skypack.dev"],
    // reactRoot: true,
    // concurrentFeatures: true,
    // serverComponents: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "bs.js"],
  async rewrites() {
    return [];
  },
  async redirects() {
    return [
      {
        source: "/posts/(.*)",
        destination: "/writing/$1",
        permanent: true,
      },
      {
        source: "/here",
        destination: "/",
        permanent: true,
      },
    ];
  },
});
