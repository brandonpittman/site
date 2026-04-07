import { form } from '$app/server';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import * as z from 'zod/mini';

const resend = new Resend(RESEND_API_KEY);

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
