import Cta from "@components/cta";
import Layout from "@components/layout";
import Link from "next/link";

export const meta = {
  title: "Home",
  description: "Brandon Pittman's personal website.",
};

export default function Index() {
  return (
    <>
      <Layout className="max-w-2xl space-y-8" meta={meta}>
        <div className="prose sm:prose-lg dark:prose-dark">
          <p className="mt-8">
            Looking for someone to help you build a JAMstack website or
            frontend-heavy application? You may not even need a backend. If you
            do, I have experience building web apps using Laravel, Jigsaw,
            Adonis, Vue, Nuxt, Gridsome, React, Gatsby and BaaS technologies
            like Netlify and Zeit Now.
          </p>

          <p className="relative my-8 text-3xl italic font-bold">
            I’m your guy for building forward-thinking progressive web apps.
          </p>

          <p className="mt-4">
            I’ve lived in Japan for over 15 years. If you’re looking to reach a
            Japanese audience or a Japanese company looking to reach a global
            audience, I can help. I’ve helped large corporations in Japan better
            connect with their foreign customers through improved site
            translations and globally focused UX consultations.
          </p>

          <p className="mt-4">
            Choose me for my experience of Japan, westerners, and my ability to
            incorporate the latest technologies to provide better experiences
            for you customers and increase engagement with them.
          </p>

          <p className="mt-4">
            You can read check out things I've written on the{" "}
            <Link href="/writing">
              <a>blog</a>
            </Link>{" "}
            or follow me on{" "}
            <a
              href="https://github.com/brandonpittman"
              target="_blank"
              rel="noopener noreferrer me"
            >
              Github
            </a>
            or{" "}
            <a
              href="https://dribbble.com/pittman"
              target="_blank"
              rel="noopener noreferrer me"
            >
              Dribbble
            </a>
            . You can read my backstory on the{" "}
            <Link href="/about">
              <a>About page</a>
            </Link>
            . If you want to get an idea in general of what I'm doing now, head
            on over to the{" "}
            <Link href="/now">
              <a>Now page</a>
            </Link>
          </p>

          <p className="mt-4">
            If you'd like to help support my continued work on open source
            software, or you'd like to say "thanks" for something of mine that
            you used or read that gave you some benefit, then consider{" "}
            <a
              href="https://buymeacoffee.com/blp"
              target="_blank"
              rel="noopener noreferrer me"
            >
              buying me a coffee.
            </a>
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Cta href="mailto:email@blp.is">Send me a message</Cta>
        </div>
      </Layout>
    </>
  );
}
