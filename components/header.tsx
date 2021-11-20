import Card from "@components/card";
import { Transition } from "@headlessui/react";
import { Menu, X } from "@images/heroicons/solid";
import { trackGoal } from "fathom-client";
import Link from "next/link";
import { useState } from "react";
import useDismiss from "use-dismiss";

const links = {
  internal: [
    {
      title: "Writing",
      to: "/writing",
    },
  ],
  external: [
    {
      title: "GitHub",
      to: "https://github.com/brandonpittman",
    },
  ],
};
const trackMobileMenuGoal = () => trackGoal("RYQBIEQE", 0);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) trackMobileMenuGoal();
  };

  const mobileMenuRef = useDismiss(() => setIsOpen(false));

  return (
    <header className="">
      <nav className="max-w-prose mx-auto w-full py-4 pb-4 bg-white">
        <div className="flex items-center justify-between w-full">
          <h1>
            <Link href="/">
              <a className="focus:outline-none focus:ring rounded inline-block">
                🏛 Brandon Pittman
              </a>
            </Link>
          </h1>

          <div className="relative block md:hidden">
            <button
              className="flex items-center focus:outline-none"
              onClick={handleMenuClick}
            >
              <span className="sr-only">Toggle menu</span>
              {!isOpen ? (
                <Menu className="w-8 h-8" />
              ) : (
                <X className="w-8 h-8" />
              )}
            </button>

            {/* Mobile nav Links */}
            <Transition
              show={isOpen}
              enter="transition duration-150 transform origin-top-right"
              enterFrom="opacity-0 scale-75"
              enterTo="opacity-100 scale-100"
              leave="transition duration-75 transform origin-top-right"
              leaveTo="opacity-0 scale-75"
            >
              <Card
                style={{ minWidth: "14rem" }}
                className="absolute right-0 p-4 text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black"
              >
                <ul ref={mobileMenuRef}>
                  {links.internal.map((link) => (
                    <li key={link.title}>
                      <Link href={link.to}>
                        <a className="block py-2 font-bold">{link.title}</a>
                      </Link>
                    </li>
                  ))}
                  {links.external.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer author"
                        className="block py-2 font-bold"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </Transition>
          </div>

          <ul className="hidden md:flex gap-8">
            {links.internal.map((link) => (
              <li key={link.title}>
                <Link href={link.to}>
                  <a className="block text-sm font-semibold tracking-wide text-gray-700 md:inline-block md:mt-0 transform transition ease-in-out duration-75 hover:text-gray-900 focus:outline-none focus:ring rounded-md p-2">
                    {link.title}
                  </a>
                </Link>
              </li>
            ))}
            {links.external.map((link) => (
              <li key={link.title}>
                <a
                  target="_blank"
                  rel="noopener noreferrer author"
                  href={link.to}
                  className="block p-2 focus:outline-none focus:ring rounded-md text-sm font-semibold tracking-wide text-gray-700 md:inline-block md:mt-0 transform transition ease-in-out duration-75 hover:text-gray-900"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
