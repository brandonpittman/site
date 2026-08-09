export const handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	// Block Cloudflare scripts
	response.headers.set('cache-control', 'public, max-age=0, must-revalidate, no-transform');
	return response;
};
