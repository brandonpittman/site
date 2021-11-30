import nextra from "nextra";
import nextPwa from "next-pwa";
import withPlugins from "next-compose-plugins";
import withSvgr from "next-svgr";
import mdxPrism from "mdx-prism";
import remarkExternalLinks from "remark-external-links";
import remarkSlug from "remark-slug";
import remarkPrism from "remark-prism";

const withPWA = nextPwa({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
  },
});

const withNextra = nextra({
  unstable_staticImage: true,
  theme: "./components/LayoutNextra.tsx",
  mdxOptions: {
    rehypePlugins: [mdxPrism],
    remarkPlugins: [remarkExternalLinks, remarkSlug, remarkPrism],
  },
});

export default withPlugins([withPWA, withSvgr, withNextra], {
  experimental: {
    urlImports: ["https://cdn.skypack.dev"],
    // concurrentFeatures: true,
    // serverComponents: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
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
