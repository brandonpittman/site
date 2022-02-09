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
      <nav className="mx-auto w-full max-w-prose bg-white py-4 pb-4">
        <div className="flex w-full items-center justify-between">
          <h1>
            <Link href="/">
              <a className="block inline-block rounded text-lg font-bold text-gray-900 focus:outline-none focus:ring">
                🏛 Brandon Pittman
              </a>
            </Link>
          </h1>

          <ul className="flex gap-8">
            {links.map((link) => (
              <li key={link.title}>
                <Link href={link.to}>
                  <a className="block block rounded-md p-2 font-medium transition transition hover:text-gray-900 focus:outline-none focus:ring md:mt-0 md:inline-block">
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
