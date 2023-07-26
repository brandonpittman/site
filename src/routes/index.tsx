import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { CopyEmail } from "~/components/copy-email";

const traditionStoicism =
  "https://traditionalstoicism.com/the-path-of-the-prokopton/";
const github = "https://github.com/brandonpittman";
const dribbble = "https://dribbble.com/pittman";
const coffee = "https://buymeacoffee.com/blp";

export default component$(() => {
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

      <div id="contact" class="cluster gutter-s">
        <div>
          Email me at{" "}
          <a href="mailto:hey@brandonpittman.com">hey@brandonpittman.com</a>
        </div>
        <CopyEmail />
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
