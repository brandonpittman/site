import { createSignal } from "solid-js";

export let CopyEmail = () => {
  let [isAnimated, setIsAnimated] = createSignal(false);

  let onClick = () => {
    navigator.clipboard.writeText("hey@brandonpittman.com").then(() => {
      setIsAnimated(true);
    });
  };

  return (
    <button
      onClick={onClick}
      onAnimationEnd={() => setIsAnimated(false)}
      class={`cta animate-once${isAnimated() ? " animation-blink" : ""}`}
    >
      Copy
    </button>
  );
};
