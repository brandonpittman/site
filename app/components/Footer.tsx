import Link from "~/components/Link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Writing", href: "/writing" },
  { label: "Reading", href: "/reading" },
];

export default function Footer() {
  return (
    <footer className="flex items-center justify-between w-full pt-16 pb-8 mx-auto text-gray-700 max-w-prose gap-4">
      <ul className="flex flex-wrap w-full text-sm gap-4">
        {footerLinks.map((link) => (
          <li key={link.href}>
            <Link
              prefetch="intent"
              to={link.href}
              className="text-gray-500 rounded transition hover:text-gray-900 focus:outline-none focus:ring focus:ring-offset-2"
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li className="md:ml-auto">
          <Link
            prefetch="intent"
            to="/colophon"
            className="text-gray-500 rounded transition hover:text-gray-900 focus:outline-none focus:ring focus:ring-offset-2"
          >
            Colophon
          </Link>
        </li>
      </ul>
    </footer>
  );
}
