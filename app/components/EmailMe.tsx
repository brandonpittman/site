import { animate, spring } from "motion";
import { useHydrated } from "remix-utils";

import type { MouseEventHandler } from "react";

const onClick: MouseEventHandler = ({ target }) => {
  navigator.clipboard
    .writeText("hey@blp.is")
    .then(() => {
      animate(
        target as HTMLButtonElement,
        {
          opacity: [1, 0.5, 1],
          scale: [1, 1.1, 1],
        },
        {
          duration: 1,
          easing: spring(),
        }
      );
    })
    .catch(console.error);
};

const CopyButton = () => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-900 text-sm text-white font-medium rounded flex py-1 px-2"
    >
      Copy
    </button>
  );
};

export const EmailMe = () => {
  let isHydrated = useHydrated();

  return (
    <div id="contact" className="flex gap-2 items-center mt-16">
      <p>
        Email me at{" "}
        <a href="mailto:hey@blp.is" className="leading-none">
          hey@blp.is
        </a>
      </p>
      {isHydrated ? <CopyButton /> : null}
    </div>
  );
};
