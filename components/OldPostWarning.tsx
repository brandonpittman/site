import clsx from "clsx";
import { differenceInMonths } from "date-fns";

const OldPostWarning = ({
  className,
  date,
}: {
  className?: string;
  date: string;
}) => {
  return differenceInMonths(new Date(date), new Date()) <= -6 ? (
    <aside
      className={clsx(
        className,
        "rounded-r-md border-l-4 border-yellow-500 bg-yellow-200 p-4 text-sm text-yellow-700 shadow-sm"
      )}
      role="alert"
    >
      <p className="font-bold">Just to let you know…</p>
      <p>
        The content in this post is more than 6 months old, so it's possible the
        content isn't up to date or that my thoughts on the subject described
        below have changed.
      </p>
    </aside>
  ) : null;
};

export default OldPostWarning;
