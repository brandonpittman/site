// ogygia island route: MessageMe is the only interactive component, so this page ships
// no SvelteKit client bootstrap. (Site-wide csr=false hits a confirmed upstream bug in
// ogygia@0.4.3's standalone-build path under Vite 8 — see plan notes — so this is scoped
// per-route for now.)
export const csr = false;
