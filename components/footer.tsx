import Link from "@components/Link";

const links = [
  { label: "About", href: "/about" },
  { label: "Stoicism", href: "/stoic" },
  { label: "Writing", href: "/writing" },
  { label: "Reading", href: "/reading" },
  { label: "Patronage", href: "/grateful" },
  {
    label: "Analytics",
    href: "https://app.usefathom.com/share/excjwhrt/blp.is",
  },
];

export default function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-prose items-center justify-between gap-4 pt-16 pb-8 text-gray-700">
      <ul className="flex w-full flex-wrap gap-4 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition hover:text-gray-900">
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="mailto:hey@blp.is"
            className="transition hover:text-gray-900"
          >
            Email
          </Link>
        </li>
        <li className="md:ml-auto">
          <Link href="/colophon" className="transition hover:text-gray-900">
            Colophon
          </Link>
        </li>
      </ul>
    </footer>
  );
}
