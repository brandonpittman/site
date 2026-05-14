import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot, type Plugin } from 'vite';

// Serves static/admin/index.html at /admin/ in `vite dev` (Cloudflare does this
// in prod). Without it the SvelteKit router 404s the CMS route in dev.
const admin_index_fallback: Plugin = {
  name: 'admin-index-fallback',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/admin') {
        res.statusCode = 301;
        res.setHeader('Location', '/admin/');
        res.end();
        return;
      }
      if (req.url === '/admin/') {
        req.url = '/admin/index.html';
      }
      next();
    });
  }
};

export default defineConfig({
  plugins: [admin_index_fallback, sveltekit(), devtoolsJson()],
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        // your custom rules
        './content'
      ]
    }
  }
});
