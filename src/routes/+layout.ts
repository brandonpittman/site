// Site-wide islands: no SvelteKit client bootstrap anywhere. ogygia's runtime + <OgygiaRouter />
// (in +layout.svelte) own navigation, view transitions, and island hydration. Components opt back
// into JS individually via `import Foo from './Foo.svelte' with { hydrate: '…' }`.
export const csr = false;
