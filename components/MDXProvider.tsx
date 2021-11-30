import { MDXProvider } from "@mdx-js/react";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "@components/Link";
import AmazonLink from "./AmazonLink";

const components = {
  Image,
  a: Link,
  Amazon: AmazonLink,
};

const Provider = ({ children }: { children: ReactNode }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default Provider;
