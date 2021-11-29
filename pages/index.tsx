import Layout from "@components/layout";
import Link from "next/link";
import { MailIcon } from "@heroicons/react/outline";

export const meta = {
  title: "Home",
  description: "Brandon Pittman's personal website.",
};

export default function Index() {
  return (
    <>
      <Layout meta={meta}>
        <div className="pt-16 prose lg:prose-lg">
          <p>
            You can read check out{" "}
            <Link href="/writing">
              <a>things I've written</a>
            </Link>{" "}
            or follow me on either{" "}
            <a
              href="https://github.com/brandonpittman"
              target="_blank"
              rel="noopener noreferrer me"
            >
              Github
            </a>{" "}
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
            . If you're still with me, check out{" "}
            <Link href="/stoic">
              <a>my journey with Stoicism</a>
            </Link>
            .
          </p>

          <p>
            If you'd like to help support my continued work on{" "}
            <a
              href="https://github.com/brandonpittman"
              rel="noopener noreferrer"
            >
              open source software
            </a>
            , or you'd like to say "thanks" for something of mine that you used
            or read that gave you some benefit, then consider{" "}
            <a
              href="https://buymeacoffee.com/blp"
              target="_blank"
              rel="noopener noreferrer me"
            >
              buying me a coffee.
            </a>
          </p>

          <div id="contact" className="flex gap-1 items-center">
            <MailIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />

            <a href="mailto:hey@blp.is" className="!no-underline">
              Shoot me an email
            </a>
          </div>
        </div>
      </Layout>
    </>
  );
}
