import { component$ } from "@builder.io/qwik";
import { NavLink } from "~/components/nav-link";

export const Header = component$(() => {
  return (
    <header class="header wrapper repel w-full">
      <a href="/" class="cluster gutter-3xs no-underline font-bold">
        <span>🏛</span>
        <span>Brandon Pittman</span>
      </a>

      <ul role="list" class="cluster font-bold gutter-s">
        <NavLink href="/about">About</NavLink>
        <NavLink href="/notes">Notes</NavLink>
        <NavLink href="/colophon">Colophon</NavLink>
      </ul>
    </header>
  );
});
