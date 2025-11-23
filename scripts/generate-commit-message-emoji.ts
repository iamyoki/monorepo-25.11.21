import { readFileSync, writeFileSync } from "node:fs";
import { EMOJI_MAP } from "./constants.ts";

if (import.meta.main) {
  const commitMessageFilePath = process.argv[2];
  if (!commitMessageFilePath) throw new Error("Cannot read commit message");

  const commitMessage = readFileSync(commitMessageFilePath, "utf8");

  const [type] = commitMessage.split(": ");
  if (!type) throw new Error("Invalid type or scope");

  let emoji = EMOJI_MAP[type];

  if (!emoji) {
    for (const key in EMOJI_MAP) {
      const val = EMOJI_MAP[key];
      if (type.startsWith(key)) {
        emoji = val;
      }
    }
  }

  if (emoji) {
    writeFileSync(
      commitMessageFilePath,
      `${emoji.emoji} ${commitMessage}`,
      "utf8",
    );
  }
}
