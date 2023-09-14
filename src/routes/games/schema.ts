import { object, string, enumType, minLength } from "valibot";

export const schema = object({
  title: string([minLength(1, "Title required.")]),
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
});
