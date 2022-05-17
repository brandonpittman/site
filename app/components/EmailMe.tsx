import useClipboard from "react-use-clipboard";
import { useHydrated } from "remix-utils";
import { classNames } from "~/helpers/class-names";

const CopyButton = () => {
  let [isCopied, setCopied] = useClipboard("hey@blp.is", {
    successDuration: 1000,
  });

  return (
    <button
      onClick={setCopied}
      className={classNames(
        isCopied && "animate-flash",
        "transition relative bg-gray-900 text-sm text-white font-medium rounded flex py-1 px-2"
      )}
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
