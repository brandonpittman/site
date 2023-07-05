import { useCallback, useState } from "preact/hooks";

export let CopyEmail = () => {
  let [isAnimated, setIsAnimated] = useState(false);

  let onClick = useCallback(() => {
    navigator.clipboard.writeText("hey@brandonpittman.com").then(() => {
      setIsAnimated(true);
    });
  }, []);

  return (
    <button
      onClick={onClick}
      onAnimationEnd={() => setIsAnimated(false)}
      style={
        isAnimated
          ? {
              animation: "var(--animation-blink)",
              animationIterationCount: "var(--iteration-once)",
            }
          : {}
      }
      className="cta"
    >
      Copy
    </button>
  );
};
