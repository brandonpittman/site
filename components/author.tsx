import Card from "@components/card";
import DribbbleIcon from "@images/dribbble.svg";
import GithubIcon from "@images/github.svg";
import TwitterIcon from "@images/twitter.svg";
import { trackGoal } from "fathom-client";
import Image from "next/image";
import ProfileImg from "@images/header-profile.png";

const trackTwitterGoal = () => trackGoal("IFOPB1RM", 0);
const trackGithubGoal = () => trackGoal("JOZATR2E", 0);
const trackDribbbleGoal = () => trackGoal("EGN48GIU", 0);

export default function Author() {
  return (
    <Card className="mt-32">
      <aside className="mx-auto max-w-md p-8">
        <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full ring ring-gray-300">
          <Image
            src={ProfileImg}
            height={128}
            width={128}
            alt="Brandon in a black kimono"
            placeholder="blur"
          />
        </div>

        <div className="prose mt-8 sm:prose-lg">
          <p>
            Hello, there! I'm Brandon. I'm originally from Ohio, but now I live
            in Nagoya, Japan. I love the Web, programming, coffee, cooking and{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.georgerrmartin.com/"
            >
              A Song of Ice and Fire
            </a>
            .
          </p>

          <p>
            My usual toolset is{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://reactjs.org/"
            >
              React
            </a>
            ,{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://nextjs.org/"
            >
              Next.js
            </a>
            , and{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://tailwindcss.com/"
            >
              Tailwind
            </a>
            . I'm interested in building web sites and applications using the{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://jamstack.org/"
            >
              JAMstack
            </a>
            .
          </p>

          <div className="mt-6 flex justify-center">
            <a
              onClick={trackTwitterGoal}
              href="http://twitter.com/brandonpittman"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon className="mr-4 h-8 w-8 fill-current text-blue-400" />
            </a>

            <a
              onClick={trackGithubGoal}
              href="http://github.com/brandonpittman"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="mr-4 h-8 w-8 fill-current text-gray-900" />
            </a>

            <a
              onClick={trackDribbbleGoal}
              href="http://dribbble.com/pittman"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DribbbleIcon className="mr-4 h-8 w-8 fill-current text-gray-900" />
            </a>
          </div>
        </div>
      </aside>
    </Card>
  );
}
