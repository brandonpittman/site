import { Link } from "remix";
import type { LinkProps } from "remix";

export default function CustomLink(props: LinkProps) {
  const { children, to } = props;
  const isInternalLink = to && to.toString().startsWith("/");
  const isDocRef = to && to.toString().startsWith("#");

  if (isInternalLink) {
    return (
      <Link {...props} prefetch="intent">
        {children}
      </Link>
    );
  }

  if (isDocRef) {
    return <a {...props}>{children}</a>;
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      href={to.toString()}
    >
      {children}{" "}
    </a>
  );
}
