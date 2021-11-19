import links from "content/affiliate-links.json";

export default function AmazonLink({
  name,
  children,
  ...props
}: JSX.IntrinsicElements["a"] & {
  name: string;
}) {
  const normalizedName = name.toLowerCase();
  const link = links[normalizedName];
  if (!link)
    throw new Error(`Affiliate link for "${normalizedName}" does not exist!`);

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" {...props}>
      <i>{children}</i>
    </a>
  );
}
