import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: [vitePreprocess()],
	compilerOptions: { experimental: { async: true } },
	kit: {
		experimental: { remoteFunctions: true },
		adapter: adapter()
	}
};

export default config;
