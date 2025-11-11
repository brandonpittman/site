import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

type NavLinkProps = {
  href: string;
  matches?: string[];
};

export const NavLink = component$<NavLinkProps>(({ href, matches = [] }) => {
  const location = useLocation();
  const isCurrentPage = [href, ...matches].some((v) =>
    location.url.pathname.match(v)
  );

  useStylesScoped$(`
  a {
    text-decoration: none;
    position: relative;
  }

  [aria-current="page"] {
    color: var(--color-base-light);
  }

  [aria-current="page"]::before {
    content: "";
    position: absolute;
    inset-inline: calc(var(--space-2xs) * -1);
    inset-block: calc(var(--space-3xs) * -1);
    z-index: -1;
    border-radius: var(--border-radius-sm);
    padding-inline: var(--space-2xs);
    padding-block: var(--space-3xs);
    background-color: var(--color-base-dark);
  }

  [aria-current="page"]:focus-visible {
    outline-offset: 0.6rem;
  }
`);

  return (
    <li>
      <a href={href} aria-current={isCurrentPage ? "page" : undefined}>
        <Slot />
      </a>
    </li>
  );
});
