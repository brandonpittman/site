// Site-wide islands: no SvelteKit client bootstrap anywhere. ogygia's runtime plus
// <OgygiaRouter /> (in +layout.svelte) own navigation, view transitions and hydration.
// Components opt back into JS individually via `import Foo from './Foo.svelte' with { hydrate }`.
export const csr = false;
