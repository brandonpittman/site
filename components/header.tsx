import Link from "next/link";

const links = [
  {
    title: "Writing",
    to: "/writing",
  },
];
export default function Header() {
  return (
    <header>
      <nav className="max-w-prose mx-auto w-full py-4 pb-4 bg-white">
        <div className="flex items-center justify-between w-full">
          <h1>
            <Link href="/">
              <a className="block text-gray-900 font-bold text-lg focus:outline-none focus:ring rounded inline-block">
                🏛 Brandon Pittman
              </a>
            </Link>
          </h1>

          <ul className="flex gap-8">
            {links.map((link) => (
              <li key={link.title}>
                <Link href={link.to}>
                  <a className="block p-2 focus:outline-none focus:ring rounded-md block font-medium transition hover:text-gray-900 md:inline-block md:mt-0 transition">
                    {link.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
