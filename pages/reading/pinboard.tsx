import Head from "next/head";
import { serialize } from "cookie";
import { fetchUnread, PinboardItem } from "../api/pinboard/unread";
import { GetServerSidePropsContext } from "next";
import useSWR from "swr";

const markAsRead = (link: PinboardItem) => ({
  ...link,
  toread: "no",
});

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ReadingPage({ data }: { data: PinboardItem[] }) {
  const { data: links, mutate } = useSWR(`/api/pinboard/unread`, fetcher, {
    fallbackData: data,
    revalidateOnFocus: false,
  });

  const onClick = async (item: PinboardItem) => {
    mutate(
      links.filter((v: PinboardItem) => v.href !== item.href),
      false
    );
    await fetch("/api/pinboard/read", {
      method: "POST",
      body: JSON.stringify(markAsRead(item)),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="container py-8 mx-auto prose">
      <Head>
        <title>Unread Pinboard Links</title>
      </Head>
      <h1>Unread</h1>
      {links ? (
        <ul>
          {links.map((link: PinboardItem) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => onClick(link)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.description}
              </a>
              {link.tags ? (
                <div className="flex items-center gap-2">
                  <ul className="flex flex-wrap leading-none list-none gap-2 !m-0">
                    {link.tags.split(" ").map((tag) => (
                      <li key={tag} className="before:!hidden !p-0 !m-0">
                        <span className="">{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Loading…</p>
      )}
    </div>
  );
}

export async function getServerSideProps({
  req,
  query,
  res,
}: GetServerSidePropsContext) {
  if (
    query.password !== process.env.PINBOARD_PASSWORD &&
    req.cookies.password !== process.env.PINBOARD_PASSWORD
  ) {
    return {
      notFound: true,
    };
  } else {
    const data = await fetchUnread();

    const pwCookie = serialize(
      "password",
      String(process.env.PINBOARD_PASSWORD),
      {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365, // 1 week
      }
    );

    res.setHeader("Set-Cookie", pwCookie);

    return {
      props: {
        data,
      },
    };
  }
}
