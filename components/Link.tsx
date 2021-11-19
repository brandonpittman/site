import Link from "next/link";

export default function CustomLink(props) {
  const { children, href } = props;
  const isInternalLink = href && href.startsWith("/");
  const isDocRef = href && href.startsWith("#"); // TODO: fix later

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
    );
  }

  if (isDocRef) {
    return <a {...props}>{children}</a>;
  }

  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}{" "}
    </a>
  );
}
