// Cloudflare PAGES only. Tailors admin/config.yml to the deployment being built so
// the CMS targets the right branch and its links point at the matching deployment:
//   - backend.branch       -> CF_PAGES_BRANCH (prod: main, preview: that branch)
//   - site_url/display_url  -> on previews, the branch's stable alias
//                             (https://<branch>.<project>.pages.dev)
// Locally (CF_PAGES_BRANCH unset) the committed values are left untouched.
import { readFileSync, writeFileSync } from 'node:fs';

const PROD_BRANCH = 'main';
const path = 'static/admin/config.yml';

const branch = process.env.CF_PAGES_BRANCH;

if (!branch) {
	console.log('[cms-config] CF_PAGES_BRANCH unset — leaving config.yml as-is.');
	process.exit(0);
}

let cfg = readFileSync(path, 'utf8');

// Commit to the branch this deployment was built from.
cfg = cfg.replace(/^(\s*branch:\s*).*$/m, `$1"${branch}"`);

const url = process.env.CF_PAGES_URL; // https://<hash>.<project>.pages.dev
const isPreview = branch !== PROD_BRANCH;
let liveUrl;

if (isPreview && url) {
	liveUrl = url;
	try {
		const projectDomain = new URL(url).host.split('.').slice(1).join('.');
		const slug = branch
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
			.slice(0, 28)
			.replace(/-+$/, '');
		if (projectDomain && slug) liveUrl = `https://${slug}.${projectDomain}`;
	} catch {
		// non-URL CF_PAGES_URL — fall back to it as-is
	}
	cfg = cfg.replace(/^(site_url:\s*).*$/m, `$1${liveUrl}`);
	cfg = cfg.replace(/^(display_url:\s*).*$/m, `$1${liveUrl}`);
}

writeFileSync(path, cfg);
console.log(
	`[cms-config] branch=${branch}` + (liveUrl ? ` site_url=${liveUrl}` : ' (production domain)')
);
