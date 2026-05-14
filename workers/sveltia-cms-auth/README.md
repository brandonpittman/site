# sveltia-cms-auth

Vendored copy of [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)
(MIT) — the GitHub OAuth relay that lets Sveltia CMS at `/admin/` authenticate
editors and commit to `brandonpittman/site`.

`src/index.js` is the upstream relay copied verbatim — only `wrangler.toml`
(name + `ALLOWED_DOMAINS` + `account_id`) and this README are project-specific.

A single deployed worker serves **every** deployment: `ALLOWED_DOMAINS` whitelists
`brandonpittman.com` plus `*.<project>.pages.dev`, so the CMS logs in on
production **and** on any branch-aliased preview URL. The per-deployment target
**branch** is handled separately by `scripts/set-cms-config.js`, which rewrites
`backend.branch` in `static/admin/config.yml` at build time.

## Deploy (from repo root)

1. `npx wrangler login` — pick the **Brandon Pittman** account.
2. Fill `<PAGES_PROJECT>` in `wrangler.toml` (run `npx wrangler pages project list`).
3. Create a **GitHub OAuth App** (GitHub → Settings → Developer settings → OAuth Apps):
   - Homepage URL: `https://brandonpittman.com`
   - Authorization callback URL: `https://<worker-origin>/callback`
     (known after the first deploy; edit the callback then)
4. Deploy + secrets (always pass `--config` so wrangler doesn't run a Workers
   command against the Pages project):

   ```sh
   npx wrangler deploy --config workers/sveltia-cms-auth/wrangler.toml
   npx wrangler secret put GITHUB_CLIENT_ID --config workers/sveltia-cms-auth/wrangler.toml
   npx wrangler secret put GITHUB_CLIENT_SECRET --config workers/sveltia-cms-auth/wrangler.toml
   ```

5. Put the deployed worker origin into `static/admin/config.yml` as
   `backend.base_url` (origin only — Sveltia appends `/auth` and `/callback`).

Until deployed + `base_url` set, live `/admin/` can't log in, but local editing
("Work with Local Repository") works with no auth.
