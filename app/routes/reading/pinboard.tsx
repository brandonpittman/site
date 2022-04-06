import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { json } from "@remix-run/node";
import { pinboardPassword } from "~/cookies";
import { markAsRead, fetchUnread, PinboardItem } from "~/helpers/pinboard";

export let meta: MetaFunction = () => ({
  title: "Unread Pinboard Links",
});
export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const password = url.searchParams.get("password");
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await pinboardPassword.parse(cookieHeader)) || {};
  if (
    password !== process.env.PINBOARD_PASSWORD &&
    cookie.password !== process.env.PINBOARD_PASSWORD
  ) {
    throw new Response("Not Found", {
      status: 404,
    });
  } else {
    const links = await fetchUnread();

    cookie.password = process.env.PINBOARD_PASSWORD;
    return json(links, {
      headers: {
        "Set-Cookie": await pinboardPassword.serialize(cookie),
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
