import { form } from '$app/server';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';
import * as z from 'zod/mini';

// Read at runtime, not build time: `$env/static/private` makes a missing RESEND_API_KEY a hard
// build failure, which breaks Cloudflare Pages preview builds (the var is only set on the
// Production environment). The placeholder keeps the Resend constructor from throwing at module
// load when the key is absent — production still uses the real value. Sending from an environment
// without the key fails at the API call, which is the right behavior for a preview.
const resend = new Resend(env.RESEND_API_KEY ?? 're_placeholder_preview_build_only');

export const send_message = form(
	z.object({
		message: z.string().check(z.minLength(1, 'Message required')),
		website: z.optional(z.string()),
		from_page: z.optional(z.string())
	}),
	async ({ message, website, from_page }) => {
		if (website) return { success: true };

		await resend.emails.send({
			from: 'contact@stoicdev.org',
			to: 'hey@brandonpittman.com',
			subject: `Message from ${from_page ?? ''} on brandonpittman.com`,
			html: message
		});

		return { success: true };
	}
);
