import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.jW9mMwMP.js","_app/immutable/chunks/C7XCUjIX.js","_app/immutable/chunks/D49fEAeC.js","_app/immutable/chunks/DR5KrXqc.js","_app/immutable/chunks/BJX31tnC.js"];
export const stylesheets = [];
export const fonts = [];
