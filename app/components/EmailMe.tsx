import { useHydrated } from "remix-utils";
import { useCallback } from "react";
import { useBool } from "@kyleshevlin/use-common";

import { classNames } from "~/helpers/class-names";

const CopyButton = () => {
  const [isAnimated, { on, off }] = useBool(false);

  const onClick = useCallback(() => {
    navigator.clipboard.writeText("hey@blp.is").then(() => {
      on();
    });
  }, [on]);

  return (
    <button
      onClick={onClick}
      onAnimationEnd={off}
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
  let isHydrated = useHydrated();

  return (
    <div id="contact" className="flex gap-2 items-center">
      <p>
        Email me at{" "}
        <a href="mailto:hey@blp.is" rel="me" className="leading-none">
          hey@blp.is
        </a>
      </p>
      {isHydrated ? <CopyButton /> : null}
    </div>
  );
};
