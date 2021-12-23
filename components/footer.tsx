import Link from "@components/Link";

const links = [
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
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
    <footer className="flex justify-between items-center gap-4 pt-16 pb-8 mx-auto text-gray-700 max-w-prose w-full">
      <ul className="flex flex-wrap w-full text-sm gap-4">
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
