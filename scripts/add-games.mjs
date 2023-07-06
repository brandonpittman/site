import { readFileSync, writeFileSync } from "node:fs";
import slugify from "slugify";

let res = readFileSync("./2019.txt", { encoding: "utf8" })
  .split("\n")
  .filter((l) => !!l)
  .map((l) => l.match(/(.+) \((.+)\)/))
  .filter((l) => !!l)
  .map(([, t, a]) => [
    slugify(t.toLowerCase().replace(":", "").replace("'", "")),
    t,
    a,
  ]);

// console.log(JSON.stringify(res, null, 2));

res.forEach((v) => {
  writeFileSync(
    "../src/content/games/" + v[0] + ".md",
    `---
title: "${v[1]}"
platform: ${v[2]}
completed: 2019-12-31
---`
  );
});
