import type { LinksFunction } from "@remix-run/server-runtime";
import styles from "./distracted.css";

export let links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
export default function Distracted() {
  return <div></div>;
}
