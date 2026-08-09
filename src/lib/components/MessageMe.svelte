<script lang="ts">
	import { tick, untrack } from 'svelte';
	import { page } from '$app/state';
	import { send_message } from '../../routes/contact.remote';

	let { title = page.url.pathname }: { title?: string } = $props();

	// The swap is driven by local state rather than reading send_message.result directly, so the
	// transition can wrap the DOM change. Seeded from the server result so the no-JS path -- a
	// real POST that re-renders the page -- still shows the confirmation.
	let sent = $state(untrack(() => send_message.result?.success ?? false));

	// The view-transition-name is applied only while this transition runs. Left on permanently it
	// would also morph this section during page navigations (ogygia's router transitions the whole
	// body), which isn't what we want -- and without any name, startViewTransition cross-fades the
	// entire page just to swap a form for one line of text.
	let transitioning = $state(false);

	async function send({ submit }: { submit: () => Promise<boolean> }) {
		// Deliberately outside startViewTransition: that callback freezes the page snapshot until
		// it resolves, so awaiting the network in there would lock the UI for the whole request.
		await submit();
		if (!send_message.result?.success) return;

		if (!document.startViewTransition) {
			sent = true;
			return;
		}

		transitioning = true;
		await tick(); // name has to be on the element before the transition snapshots it
		const transition = document.startViewTransition(async () => {
			sent = true;
			await tick(); // let Svelte flush the swap before the new state is captured
		});
		await transition.finished.catch(() => {});
		transitioning = false;
	}
</script>

<section
	class="message-me flow"
	style:view-transition-name={transitioning ? 'message-me' : undefined}
>
	<h2>Message Me</h2>
	{#if sent}
		<p>Message sent!</p>
	{:else}
		<form {...send_message.enhance(send)}>
			<input
				{...send_message.fields.website}
				autocomplete="off"
				tabindex="-1"
				aria-hidden="true"
				class="honeypot"
			/>
			<input {...send_message.fields.from_page.as('hidden', title)} />
			<textarea {...send_message.fields.message.as('text')} rows="4"></textarea>
			<button class="cta">Send</button>
		</form>
	{/if}
</section>

<style>
	.honeypot {
		position: absolute;
		left: -9999px;
		opacity: 0;
		height: 0;
		width: 0;
		pointer-events: none;
	}

  .message-me {
    margin-block-start: 3rem;
  }

	.message-me h2 {
		font-size: var(--size-step-1);
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-2xs);
	}

	textarea {
		align-self: stretch;
		font-size: max(1rem, var(--size-step--1));
		padding: var(--space-3xs) var(--space-2xs);
		resize: vertical;
		border-radius: var(--border-radius-sm);
		border: 1px solid var(--color-base-dark);
		max-inline-size: var(--content-measure);
	}
</style>
