import { useSignal, component$, $ } from "@builder.io/qwik";

export const CopyEmail = component$(() => {
  const isAnimated = useSignal(false);

  const onClick = $(() => {
    // For Safari…
    // https://wolfgangrittner.dev/how-to-use-clipboard-api-in-firefox/
    const email = new ClipboardItem({
      "text/plain": new Blob(["hey@brandonpittman.com"], {
        type: "text/plain",
      }),
    });
    navigator.clipboard.write([email]).then(() => {
      isAnimated.value = true;
    });
  });

  return (
    <button
      onClick$={onClick}
      onAnimationEnd$={$(() => (isAnimated.value = false))}
      class={`cta animate-once${isAnimated.value ? " animation-blink" : ""}`}
    >
      Copy
    </button>
  );
});
