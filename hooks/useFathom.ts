import * as Fathom from "fathom-client";
import { useEffect } from "react";

const useFathom = (): void => {
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

export default useFathom;
