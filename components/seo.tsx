import useOgpImage from "@hooks/use-ogp-image";
import Head from "next/head";

export default function SEO({
  title = "Brandon's Site",
  description = "Brandon's site.",
}: {
  title: string;
  description: string;
}) {
  const image = useOgpImage(title);
  return (
    <Head>
      <title>{title + " | Brandon Pittman"}</title>
      <meta name="description" content={description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@brandonpittman" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
    </Head>
  );
}
