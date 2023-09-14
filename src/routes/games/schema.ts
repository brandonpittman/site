import { array, object, string, enumType } from "valibot";

export const schema = array(
  object({
    title: string(),
    platform: enumType([
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
    status: enumType(["unbeaten", "unplayed", "beaten", "abandoned"]),
  })
);
