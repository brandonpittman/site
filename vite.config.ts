import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), devtoolsJson()],
  resolve: {
    alias: {
      buffer: 'buffer/'
    }
  },
  define: {
    'global.Buffer': 'Buffer'
  },
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
