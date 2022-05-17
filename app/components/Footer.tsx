import Link from "~/components/Link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Writing", href: "/writing" },
  { label: "Reading", href: "/reading" },
];

export default function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-prose items-center justify-between gap-4 pt-16 pb-8 text-gray-700">
      <ul className="flex w-full flex-wrap gap-4 text-sm">
        {footerLinks.map((link) => (
          <li key={link.href}>
            <Link to={link.href} className="transition hover:text-gray-900">
              {link.label}
            </Link>
          </li>
        ))}
        <li className="md:ml-auto">
          <Link to="/colophon" className="transition hover:text-gray-900">
            Colophon
          </Link>
        </li>
      </ul>
    </footer>
  );
}
