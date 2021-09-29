// something
const withPWA = require("next-pwa")({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
  },
});
const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");
const mdxPrism = require("mdx-prism");
const withMdx = require("@next/mdx")({
  options: {
    rehypePlugins: [mdxPrism],
    remarkPlugins: [
      require("remark-external-links"),
      require("remark-slug"),
      require("remark-prism"),
    ],
  },
});

module.exports = withPlugins([withPWA, withMdx, withSvgr], {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx", "bs.js"],
  async rewrites() {
    return [
      {
        source: "/bee.js",
        destination: "https://cdn.splitbee.io/sb.js",
      },
      {
        source: "/_hive/:slug",
        destination: "https://hive.splitbee.io/:slug",
      },
    ];
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
