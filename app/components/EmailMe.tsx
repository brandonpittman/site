import { useCallback, useState } from "react";

import { classNames } from "~/helpers/class-names";

export let CopyButton = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  const onClick = useCallback(() => {
    navigator.clipboard.writeText("hey@brandonpittman.com").then(() => {
      setIsAnimated(true);
    });
  }, []);

  return (
    <button
      onClick={onClick}
      onAnimationEnd={() => setIsAnimated(false)}
      className={classNames(
        isAnimated && "animate-flash",
        "bg-gray-900 text-sm text-white font-medium rounded flex py-1 px-2"
      )}
    >
      Copy
    </button>
  );
};

export const EmailMe = () => {
  return (
    <div id="contact" className="flex gap-1.5 items-center">
      <span>Email me at</span>
      <a href="mailto:hey@brandonpittman.com" rel="me" className="leading-none">
        hey@brandonpittman.com
      </a>
      <CopyButton />
    </div>
  );
};
