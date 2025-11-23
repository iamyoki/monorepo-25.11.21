import { readFileSync, writeFileSync } from "node:fs";

const emojiMap: Record<string, string> = {
  feat: "✨",
  fix: "🐛",
  chore: "🎨",
  style: "💄",
  test: "🧪",
  build: "📦️",
  "chore(release)": "🚀",
  ci: "👷",
  docs: "📝",
  perf: "⚡️",
  refactor: "♻️",
  revert: "➖",
};

const commitMessageFilePath = process.argv[2];
if (!commitMessageFilePath) throw new Error("Cannot read commit message");

const commitMessage = readFileSync(commitMessageFilePath, "utf8");

const [type] = commitMessage.split(": ");
if (!type) throw new Error("Invalid type or scope");

if (type in emojiMap) {
  const emoji = emojiMap[type];
  writeFileSync(commitMessageFilePath, `${emoji} ${commitMessage}`, "utf8");
}
