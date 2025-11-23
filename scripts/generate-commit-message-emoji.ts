import { readFileSync, writeFileSync } from "node:fs";
import { EMOJI_MAP } from "./constants.ts";

if (import.meta.main) {
  const commitMessageFilePath = process.argv[2];
  if (!commitMessageFilePath) throw new Error("Cannot read commit message");

  const commitMessage = readFileSync(commitMessageFilePath, "utf8");

  const [type] = commitMessage.split(": ");
  if (!type) throw new Error("Invalid type or scope");

  if (type in EMOJI_MAP) {
    const emoji = EMOJI_MAP[type];
    writeFileSync(commitMessageFilePath, `${emoji} ${commitMessage}`, "utf8");
  }
}
