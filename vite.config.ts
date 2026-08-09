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

// Works around a build-order race between ogygia and SvelteKit under site-wide `csr = false`.
//
// When every route is csr=false, Kit skips its own client build, so ogygia runs a nested
// out-of-band build and writes its runtime + island chunks straight into
// .svelte-kit/output/client. But ogygia is `enforce: 'pre'`, so its buildStart always runs
// BEFORE Kit's -- and Kit's buildStart calls `rimraf(out)` on the whole output directory.
// Measured: ogygia writes, Kit deletes it ~2ms later. The build then "succeeds" while
// silently shipping no island JS at all.
//
// So: stash ogygia's chunks in the window after it writes and before Kit wipes them (this
// plugin has no `enforce` and sits before sveltekit() in the array, so its buildStart lands
// in exactly that gap), then put them back in writeBundle. Restoring must happen before
// Kit's own writeBundle, because that is where the adapter copies output/client into the
// deployable directory -- hence this plugin also sits before sveltekit() for that hook.
// Kit's csr=false branch only ever `copy()`s into that dir, so restored files survive.
// Everything in _app/immutable at stash time belongs to ogygia's nested build -- not just the
// `ogygia-*` entry chunks but the hashed shared chunks they import (Kit has built nothing yet).
// Missing those leaves the runtime entry 404ing on its own dependency, so it never executes and
// the router never installs. Copy the whole tree, both ways.
function copy_tree(from: string, to: string, { overwrite = true } = {}) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) copy_tree(src, dest, { overwrite });
    else if (overwrite || !fs.existsSync(dest)) fs.copyFileSync(src, dest);
  }
}

// ogygia's nested build doesn't apply SvelteKit's Vite `define` replacements, so island chunks
// ship a bare `__SVELTEKIT_DEV__` and die on load with a ReferenceError -- hydration silently
// fails and the contact form degrades to a full-page POST. Kit's own build substitutes this the
// same way (a plain text replacement), so do it here for the chunks Kit never saw.
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

// These hooks fire once per environment build (ssr, client, service worker), and Kit's
// rimraf runs on each pass too -- so both halves must be idempotent and the stash has to
// outlive the whole build. Refresh it whenever ogygia's output is on disk, restore on every
// bundle write, and only clean up at the very end.
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
    // Never clobber Kit's own output -- only fill in what ogygia emitted and Kit's rimraf took.
    copy_tree(STASH, IMMUTABLE, { overwrite: false });
  },
  closeBundle() {
    if (!fs.existsSync(STASH)) return;
    copy_tree(STASH, IMMUTABLE, { overwrite: false });
  }
};

export default defineConfig({
  // ogygia must come before sveltekit() so it can transform `with { hydrate | defer | preset }` imports.
  // ogygia_output_rescue must sit between them -- see the comment on that plugin.
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
