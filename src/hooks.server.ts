import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { ogygiaHandle } from 'ogygia/hooks';

const cache_headers: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	// Block Cloudflare scripts
	response.headers.set('cache-control', 'public, max-age=0, must-revalidate, no-transform');
	return response;
};

// ogygiaHandle serves signed deferred-region / lake-remount HTML and injects page seeds for
// island hydration; it runs first so the cache-control header still lands on what it returns.
export const handle = sequence(ogygiaHandle(), cache_headers);
