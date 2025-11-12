import { component$, useStyles$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import foo from "../styles/foo.less?inline";

const traditionStoicism =
  "https://traditionalstoicism.com/the-path-of-the-prokopton/";
const github = "https://github.com/brandonpittman";
const dribbble = "https://dribbble.com/pittman";
const coffee = "https://buymeacoffee.com/blp";

export default component$(() => {
  useStyles$(foo);

  return (
    <>
      <p>
        Welcome to my little corner of the Internet! This site is an attempt to
        get back to where we used to be in the 90's&mdash;everyone having their
        own personal site that told the world who they are and what they're
        interested in.
      </p>
      <p>
        My name is Brandon Pittman. I build web sites and apps, study{" "}
        <a href={traditionStoicism}>traditional Stoicism</a>, and I train
        Brazilian jiu-jitsu. I sometimes <a href="/notes">write</a> about
        programming, Stoic ideals, and managing time and attention. I don't use
        social media aside from <a href={github}>GitHub</a> or{" "}
        <a href={dribbble}>Dribbble</a>. My backstory is on the{" "}
        <a href="/about">About</a> page. If you're interested in what I'm{" "}
        <a href="/unread">reading</a> or <a href="/unplayed">playing</a>, those
        lists are available too.
      </p>

      <p>
        If you'd like to help support my continued work on open source software,
        or you'd like to say "thanks" for something of mine that you used or
        read that gave you some benefit, then consider{" "}
        <a href={coffee} target="_blank" rel="noopener noreferrer">
          buying me a coffee
        </a>
        .
      </p>

      <p>
        If you wanna listen to some music I've been digging lately-ish, here's
        my{" "}
        <a href="https://music.apple.com/us/playlist/hot-shit/pl.u-GgLNRT738Pa">
          Preferred Indifferents
        </a>{" "}
        playlist in Apple Music.
      </p>

      <div id="contact" class="cluster gutter-3xs align-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width={1.5}
          stroke="currentColor"
          style={{ blockSize: "1.5rem" }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>

        <a href="mailto:hey@brandonpittman.com">hey@brandonpittman.com</a>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  meta: [
    {
      name: "description",
      content: "Brandon Pittman's little corner of the Internet.",
    },
  ],
  frontmatter: {
    hideH1: true,
  },
};
