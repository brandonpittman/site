import { useAnimation, m, LazyMotion, domAnimation } from "framer-motion";
import { useHydrated } from "remix-utils";

import type { MouseEventHandler } from "react";

const EMAIL = "hey@blp.is";

const CopyButton = () => {
  const controls = useAnimation();

  const onClick: MouseEventHandler = () => {
    navigator.clipboard
      .writeText(EMAIL)
      .then(() => {
        controls.start(
          {
            opacity: [0.5, 1],
          },
          { duration: 1 }
        );
      })
      .catch(console.error);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        onClick={onClick}
        className="bg-gray-900 text-sm text-white font-medium rounded flex py-1 px-2"
        animate={controls}
      >
        Copy
      </m.button>
    </LazyMotion>
  );
};

export const EmailMe = () => {
  let isHydrated = useHydrated();

  return (
    <div id="contact" className="flex gap-2 items-center mt-16">
      <p>
        Email me at{" "}
        <a href="mailto:hey@blp.is" className="leading-none">
          {EMAIL}
        </a>
      </p>
      {isHydrated ? <CopyButton /> : null}
    </div>
  );
};
