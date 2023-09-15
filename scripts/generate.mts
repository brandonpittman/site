import { execSync } from "node:child_process";
import { globSync } from "glob";
import { intro, outro, text, select, cancel, isCancel } from "@clack/prompts";
import { regex, safeParse, string, minLength, flatten } from "valibot";
import { existsSync, writeFileSync } from "node:fs";

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

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

const handleCancel = (valueToCheck: unknown, message = "Goodbye!") => {
  if (isCancel(valueToCheck)) {
    cancel(message);
    process.exit(0);
  }
};

const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*(\.(mdx?))?$/g;
const validExtension = /\.(mdx?)$/g;

type Resource = { raw: string; type: string };

console.clear();
intro("Create new resource");

const resource = (await select({
  message: "Pick a resource type.",
  options: mappedConfigFiles.map((v) => ({
    value: v,
    label: capitalizeFirstLetter(v.type),
  })),
})) as Resource;

handleCancel(resource);

const { schema } = await import("../" + resource.raw);

if (schema.schema !== "object") {
  throw new Error("Schema must be an object schema.");
}

const entries = Object.entries(schema.object);

const metadata = {};

const filename = await text({
  message: "Filename?",
  validate(value) {
    const validated = safeParse(
      string([
        minLength(1, "Filename cannot be empty"),
        regex(validSlug, "Invalid filename slug"),
        regex(validExtension, "Extension must be .md or .mdx"),
      ]),
      value
    );
    if (validated.success) {
      var writePath = `src/routes/${resource.type}/${
        value.split(".")[0]
      }/index.md`;

      const pathExists = existsSync(writePath);

      if (pathExists) {
        return "Path already exists";
      }
      return;
    } else {
      return validated.issues[0].message;
    }
  },
});

handleCancel(filename);

const writePath = `src/routes/${resource.type}/${
  (filename as string).split(".")[0]
}/index.md`;

for (let [key, subSchema] of entries) {
  let isOptional = subSchema.schema === "optional";
  let initialValue = subSchema.default;
  let parsedSchema =
    subSchema.schema === "optional" ? subSchema.wrapped : subSchema;

  switch ((parsedSchema as any).schema) {
    case "boolean":
      metadata[key] = await select({
        message: capitalizeFirstLetter(key) + "?",
        initialValue: initialValue ? "true" : "false",
        options: [
          { value: "true", label: "True" },
          { value: "false", label: "False" },
        ],
      });

      break;
    case "enum":
      metadata[key] = await select({
        message: capitalizeFirstLetter(key) + "?",
        initialValue,
        options: parsedSchema.enum.map((v) => ({ value: v, label: v })),
      });
      break;
    default:
      metadata[key] = await text({
        message: capitalizeFirstLetter(key) + "?",
        initialValue,
        validate(value) {
          if (isOptional) return;
          let validated = safeParse(parsedSchema, value);
          if (validated.success) {
            return;
          } else {
            return validated.issues.at(0)?.message;
          }
        },
      });
  }

  handleCancel(metadata[key]);
}

const command = execSync(
  `npm run qwik new /${resource.type}/${filename as string}`
);

console.log(command.toString());

const output = `---
${Object.entries(metadata)
  .filter(([_, v]) => v)
  .map(
    ([k, v]) =>
      `${k}: ${
        ["true", "false"].includes(v as "true" | "false") ? `${v}` : `"${v}"`
      }`
  )
  .join("\n")}
---`;

writeFileSync(writePath, output);

outro("All done!");
