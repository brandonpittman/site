// Copies the self-hosted Sveltia CMS bundle from the npm dependency into the
// admin folder so it is served at /admin/sveltia-cms.js. Runs on `prepare`
// (after install) and `build`. The destination is gitignored — it is a
// generated artifact; update Sveltia by bumping @sveltia/cms in package.json.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const src = 'node_modules/@sveltia/cms/dist/sveltia-cms.js';
const dest = 'static/admin/sveltia-cms.js';

if (!existsSync(src)) {
	console.warn(`[copy-cms] ${src} not found — install dependencies first; skipping.`);
	process.exit(0);
}

mkdirSync(dirname(dest), { recursive: true });
copyFileSync(src, dest);
console.log(`[copy-cms] ${src} -> ${dest}`);
