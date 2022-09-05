import Link from "./Link";

const links = [
  {
    title: "About",
    to: "/about",
  },
  {
    title: "Writing",
    to: "/writing",
  },
];
export default function Header() {
  return (
    <header>
      <nav className="mx-auto w-full max-w-prose bg-white py-4 pb-4">
        <div className="flex flex-wrap gap-4 w-full items-center justify-between">
          <h1>
            <Link
              to="/"
              className="block inline-block rounded text-lg font-bold text-gray-900 focus:outline-none focus:ring"
            >
              🏛 Brandon Pittman
            </Link>
          </h1>

          <ul className="flex flex-wrap gap-4">
            {links.map((link) => (
              <li key={link.title}>
                <Link
                  to={link.to}
                  className="block block rounded-md font-medium transition transition hover:text-gray-900 focus:outline-none focus:ring"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
