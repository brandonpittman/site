import * as Fathom from "fathom-client";
import { useEffect } from "react";

export const useFathom = (): void => {
  useEffect(() => {
    Fathom.load("EXCJWHRT", {
      includedDomains: [
        "blp.is",
        "www.blp.is",
        "brandonpittman.com",
        "www.brandonpittman.com",
      ],
      url: "https://fortunate-attractive.blp.is/script.js",
    });
  }, []);
};

const blacklist = ["/reading/pinboard"];

export const trackPageview = (url: string) => {
  if (!blacklist.some((v) => url.startsWith(v))) Fathom.trackPageview();
};
