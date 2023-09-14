import { globSync } from "glob";
import matter from "gray-matter";
import { parse } from "valibot";
import { readFileSync } from "fs";

const configFiles = globSync("src/routes/*/schema.ts", {
  ignore: "node_modules/**",
});

const mappedConfigFiles = configFiles.map((raw) => {
  const type = raw.split("src/routes/")[1].split("/")[0];
  return {
    raw,
    type,
  };
});

mappedConfigFiles.forEach((f) => {
  const contentFiles = globSync(`src/routes/${f.type}/**/*.{md,mdx}`);
  const dataMap = contentFiles.map((v) => matter(readFileSync(v)).data);

  import("../" + f.raw)
    .then(({ schema }) => {
      parse(schema, dataMap);
    })
    .catch((e: Error) => {
      if (
        e.message === "Cannot read properties of undefined (reading '_parse')"
      ) {
        console.error(`Module "${f.raw}" does not contain a "schema" export.`);
      } else {
        throw e;
      }
    });
});
