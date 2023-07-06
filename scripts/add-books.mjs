import { readFileSync, writeFileSync } from "node:fs";
import slugify from "slugify";

let res = readFileSync("./2020.txt", { encoding: "utf8" })
  .split("\n")
  .filter((l) => !!l)
  .map((l) => l.match(/(.+) \((.+)\)/))
  .map(([, t, a]) => [slugify(t.toLowerCase().replace(":", "")), t, a]);

res.forEach((v) => {
  writeFileSync(
    "./src/content/books/" + v[0] + ".md",
    `---
title: "${v[1]}"
author: ${v[2]}
completed: 2020-12-31
---`
  );
});
