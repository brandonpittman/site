import Head from "next/head";
import { serialize } from "cookie";
import { fetchUnread, PinboardItem } from "./api/pinboard/unread";
import { GetServerSidePropsContext } from "next";
import useSWR, { mutate } from "swr";

const readItem = (link: PinboardItem) => ({
  ...link,
  toread: "no",
});

export default function ReadingPage({ data }: { data: PinboardItem[] }) {
  const { data: links } = useSWR(`/api/pinboard/unread`, {
    initialData: data,
  });

  const onClick = async (item: PinboardItem) => {
    mutate(
      "/api/pinboard/unread",
      data.filter((v) => v.href !== item.href),
      false
    );

    await fetch("/api/pinboard/read", {
      method: "POST",
      body: JSON.stringify(readItem(item)),
      headers: {
        "Content-Type": "application/json",
      },
    });

    mutate("/api/pinboard/unread");
  };

  return (
    <div className="container py-8 mx-auto prose">
      <Head>
        <title>Unread Pinboard Links</title>
      </Head>
      <h1>Unread Pinboard Links</h1>
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
        maxAge: 60 * 60 * 24 * 7, // 1 week
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
