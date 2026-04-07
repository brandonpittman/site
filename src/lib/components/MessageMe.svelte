<script lang="ts">
	import { send_message } from '../../routes/contact.remote';
</script>

<section class="message-me flow">
	<h2>Message Me</h2>
	{#if send_message.result?.success}
		<p>Message sent!</p>
	{:else}
		<form {...send_message}>
			<input
				{...send_message.fields.website}
				autocomplete="off"
				tabindex="-1"
				aria-hidden="true"
				class="honeypot"
			/>
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
		font-size: var(--size-step--1);
		padding: var(--space-3xs) var(--space-2xs);
		resize: vertical;
		border-radius: var(--border-radius-sm);
		border: 1px solid var(--color-base-dark);
		max-inline-size: var(--content-measure);
	}
</style>
