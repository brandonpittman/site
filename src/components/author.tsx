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
      <aside className="max-w-md p-8 mx-auto">
        <div className="relative w-32 h-32 mx-auto overflow-hidden rounded-full ring ring-gray-300">
          <Image
            src={ProfileImg}
            height={128}
            width={128}
            alt="Brandon in a black kimono"
            placeholder="blur"
          />
        </div>

        <div className="mt-8 prose sm:prose-lg">
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

          <div className="flex justify-center mt-6">
            <a
              onClick={trackTwitterGoal}
              href="http://twitter.com/brandonpittman"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon className="w-8 h-8 mr-4 text-blue-400 fill-current" />
            </a>

            <a
              onClick={trackGithubGoal}
              href="http://github.com/brandonpittman"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="w-8 h-8 mr-4 text-gray-900 fill-current" />
            </a>

            <a
              onClick={trackDribbbleGoal}
              href="http://dribbble.com/pittman"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DribbbleIcon className="w-8 h-8 mr-4 text-gray-900 fill-current" />
            </a>
          </div>
        </div>
      </aside>
    </Card>
  );
}
