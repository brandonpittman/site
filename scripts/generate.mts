import { globSync } from "glob";
import { intro, outro, text, select, cancel, isCancel } from "@clack/prompts";
import { safeParse } from "valibot";

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

console.log(metadata);

outro("All done!");
