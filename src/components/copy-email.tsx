import { useSignal, component$, $ } from "@builder.io/qwik";

export const CopyEmail = component$(() => {
  const isAnimated = useSignal(false);

  const onClick = $(async () => {
    await navigator.clipboard.writeText("hey@brandonpittman.com");
    isAnimated.value = true;
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
