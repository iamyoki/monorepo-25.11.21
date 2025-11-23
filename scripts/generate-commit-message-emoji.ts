import { readFileSync, writeFileSync } from "node:fs";
import { Model as CommitModel } from "./commit.js";
import { EMOJI_MAP } from "./constants.js";

if (import.meta.main) {
  (async function () {
    const commitMessageFilePath = process.argv[2];
    if (!commitMessageFilePath) throw new Error("Cannot read commit message");

    const commitMessage = readFileSync(commitMessageFilePath, "utf8");

    const [type, description] = commitMessage.split(": ");
    if (!type) throw new Error("Invalid type or scope");

    let emojiObj = EMOJI_MAP[type];
    if (!emojiObj) {
      for (const key in EMOJI_MAP) {
        const val = EMOJI_MAP[key];
        if (type.startsWith(key)) {
          emojiObj = val;
        }
      }
    }

    const hasScope = /^w+\(w+\)$/.test(type);
    let scope = "";
    if (!hasScope) {
      const commitModel = new CommitModel();
      await commitModel.scan();
      const packages = commitModel.getAllPackages();
      scope = `(${packages.map((name) => name || "root").join(", ")})`;
    }

    const emoji = emojiObj ? `${emojiObj.emoji} ` : "";

    const finalCommitMessage = `${emoji}${type}${scope}: ${description}`;

    writeFileSync(commitMessageFilePath, finalCommitMessage, "utf8");
  })();
}
