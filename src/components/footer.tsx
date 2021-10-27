import Link from "next/link";

const links = [
  { label: "About", href: "/about" },
  { label: "Stoicism", href: "/stoic" },
  { label: "Writing", href: "/writing" },
  { label: "Patronage", href: "/grateful" },
  {
    label: "Analytics",
    href: "https://app.usefathom.com/share/excjwhrt/blp.is",
  },
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center px-4 py-16 mx-auto text-sm text-gray-700 dark:text-gray-400 sm:px-8 space-y-2">
      <ul className="flex flex-wrap justify-start w-full sm:justify-items-center sm:w-auto">
        {links.map((link) => (
          <li key={link.href} className="p-1">
            <Link href={link.href}>
              <a className="text-blue-600 hover:underline dark:text-blue-400">
                {link.label}
              </a>
            </Link>
          </li>
        ))}
        <li className="p-1">
          <a
            href="mailto:hey@blp.is"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Email
          </a>
        </li>
      </ul>

      <div className="flex flex-col items-center gap-2">
        <p>
          This site is powered by{" "}
          <a
            className="text-blue-600 hover:underline dark:text-blue-400"
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer noopener"
          >
            Next.js
          </a>{" "}
          and its source is available on{" "}
          <a
            href="https://github.com/brandonpittman/next-blog"
            target="_blank"
            rel="noreferrer noopener author"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            GitHub.
          </a>
        </p>
        <p>Copyright © {new Date().getFullYear()}.&nbsp;</p>
      </div>
    </footer>
  );
}
