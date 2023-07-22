import { useSignal, component$, $ } from "@builder.io/qwik";

export const CopyEmail = component$(() => {
  const isAnimated = useSignal(false);

  const onClick = $(() => {
    navigator.clipboard.writeText("hey@brandonpittman.com").then(() => {
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
