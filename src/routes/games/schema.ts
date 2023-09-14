import { object, string, enumType, optional } from "valibot";

export const schema = object({
  title: string(),
  platform: optional(
    enumType([
      "PS1",
      "PS2",
      "PS3",
      "PS4",
      "Xbox",
      "Xbox 360",
      "Xbox One",
      "Xbox Series X",
      "GameCube",
      "Wii",
      "DS",
      "iOS",
      "PC",
      "DC",
    ]),
    "Xbox Series X"
  ),
  status: optional(
    enumType(["unbeaten", "unplayed", "beaten", "abandoned"]),
    "unbeaten"
  ),
});
