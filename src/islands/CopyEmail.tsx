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
      style={
        isAnimated()
          ? {
              animation: "var(--animation-blink)",
              "animation-iteration-count": "var(--iteration-count)",
            }
          : {}
      }
      class="cta"
    >
      Copy
    </button>
  );
};
