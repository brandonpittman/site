/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  mdx: async () => {
    const [remarkGfm] = await Promise.all([
      import("remark-gfm").then((mod) => mod.default),
    ]);

    return {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    };
  },
  serverBuildTarget: "cloudflare-workers",
  server: "./server.js",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: [".*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
