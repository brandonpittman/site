export default function useOgpImage(title: string, theme = "dark") {
  return `https://blp-og-image.vercel.app/${encodeURI(title)}?theme=${theme}`;
}
