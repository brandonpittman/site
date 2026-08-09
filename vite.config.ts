import fs from 'node:fs';
import path from 'node:path';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { ogygia } from 'ogygia/vite';
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

const IMMUTABLE = '.svelte-kit/output/client/_app/immutable';
const STASH = '.svelte-kit/.ogygia-stash';

function copy_tree(from: string, to: string, { overwrite = true } = {}) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) copy_tree(src, dest, { overwrite });
    else if (overwrite || !fs.existsSync(dest)) fs.copyFileSync(src, dest);
  }
}

// ogygia's nested build doesn't apply SvelteKit's Vite `define`s, so island chunks ship a bare
// `__SVELTEKIT_DEV__` and throw a ReferenceError on load -- hydration fails silently and
// interactive components quietly fall back to their no-JS path. Kit's own build does this same
// substitution; do it for the chunks Kit never sees.
function apply_kit_defines(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) apply_kit_defines(target);
    else if (entry.name.endsWith('.js')) {
      const code = fs.readFileSync(target, 'utf8');
      if (code.includes('__SVELTEKIT_DEV__')) {
        fs.writeFileSync(target, code.replaceAll('__SVELTEKIT_DEV__', 'false'));
      }
    }
  }
}

const has_ogygia_output = (dir: string) =>
  fs.existsSync(dir) && fs.readdirSync(dir).some((f) => f.startsWith('ogygia-'));

// Works around a build-order race between ogygia and SvelteKit under site-wide `csr = false`.
//
// Kit skips its own client build when every route is csr=false, so ogygia runs a nested build and
// writes its runtime + island chunks straight into .svelte-kit/output/client. But ogygia is
// `enforce: 'pre'`, so its buildStart always runs BEFORE Kit's -- and Kit's buildStart calls
// `rimraf(out)` on the whole output directory. Measured 2ms apart. The build then "succeeds" while
// shipping no island JS at all; the giveaway is that ogygia's .svelte-kit/ogygia-island-deps.json
// survives (it lives outside output/) while every chunk it names is gone.
//
// So: stash ogygia's output in the window after it writes and before Kit wipes it -- this plugin
// has no `enforce` and sits before sveltekit() in the array, so its buildStart lands in exactly
// that gap -- then restore in writeBundle. Restoring must happen before Kit's own writeBundle,
// since that is where the adapter copies output/client into the deployable directory. Kit's
// csr=false branch only ever copy()s into that dir, so restored files survive.
//
// Both halves are idempotent and the stash outlives the whole build, because these hooks fire once
// per environment build and Kit's rimraf runs on each pass.
//
// `emptyOutDir: false` is not an option here: Kit lists emptyOutDir in its enforced_config
// (@sveltejs/kit/src/exports/vite/index.js) and overrides user config.
const ogygia_output_rescue: Plugin = {
  name: 'ogygia-output-rescue',
  apply: 'build',
  buildStart() {
    if (!has_ogygia_output(IMMUTABLE)) return;
    fs.rmSync(STASH, { recursive: true, force: true });
    copy_tree(IMMUTABLE, STASH);
    apply_kit_defines(STASH);
  },
  writeBundle() {
    if (!fs.existsSync(STASH)) return;
    // Never clobber Kit's own output -- only fill back in what Kit's rimraf took.
    copy_tree(STASH, IMMUTABLE, { overwrite: false });
  },
  closeBundle() {
    if (!fs.existsSync(STASH)) return;
    copy_tree(STASH, IMMUTABLE, { overwrite: false });
  }
};

export default defineConfig({
  // ogygia must come before sveltekit() so it can transform `with { hydrate | defer | preset }`
  // imports; ogygia_output_rescue must sit between them -- see the comment on that plugin.
  plugins: [
    admin_index_fallback,
    ogygia(),
    ogygia_output_rescue,
    sveltekit(),
    devtoolsJson()
  ],
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
