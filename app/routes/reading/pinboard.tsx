import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";

import { useLoaderData, useFetcher } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";

import type { PinboardItem } from "~/helpers/pinboard.server";
import { markAsRead, fetchUnread } from "~/helpers/pinboard.server";
import { getPagesContext } from "server";

export let meta: MetaFunction = () => ({
  title: "Unread Pinboard Links",
});

export let loader: LoaderFunction = async ({ request }) => {
  let {
    env,
    sessionStorage: { getSession, commitSession },
  } = getPagesContext();
  const url = new URL(request.url);
  const password = url.searchParams.get("password");
  const session = await getSession(request.headers.get("Cookie"));

  if (password !== env.PINBOARD_PASSWORD && !session.id) {
    throw new Response("Not Found", {
      status: 404,
    });
  } else {
    const links = await fetchUnread();

    session.set("password", env.PINBOARD_PASSWORD);
    return json(links, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
};

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let item = formData.get("item");
  await markAsRead({ ...JSON.parse(item as string), toread: "no" });
  return null;
};

export default function ReadingPage() {
  let links = useLoaderData();

  return (
    <>
      <h1>Unread</h1>
      <ul>
        {links.map((link: PinboardItem) => (
          <UnreadLink key={link.href} {...link} />
        ))}
      </ul>
    </>
  );
}

function UnreadLink(props: PinboardItem) {
  let fetcher = useFetcher();
  let onClick = (item: PinboardItem) => {
    fetcher.submit({ item: JSON.stringify(item) }, { method: "post" });
  };

  return (
    <li
      hidden={
        fetcher.submission
          ? JSON.parse(fetcher.submission?.formData.get("item") as string)
              .href === props.href
          : false
      }
    >
      <a
        href={props.href}
        onClick={() => onClick(props)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.description}
      </a>
    </li>
  );
}
