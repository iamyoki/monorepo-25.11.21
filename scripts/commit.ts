import path from "node:path";
import prompts, { type Choice } from "prompts";
import { readPackageUpSync } from "read-package-up";
import { simpleGit, type SimpleGit } from "simple-git";
import { EMOJI_MAP } from "./constants.ts";

class File {
  constructor(
    public readonly filePath: string,
    public readonly fileName: string,
    public readonly pacakgeName: string,
  ) {}
}

class Model {
  private files: File[] = [];
  private readonly git: SimpleGit = simpleGit();

  async scan() {
    const status = await this.git.status();
    const statusFiles = status.files;
    const files = statusFiles.map(({ path: filePath }) => {
      const fileName = path.basename(filePath);
      const packageJson = readPackageUpSync({ cwd: filePath })?.packageJson;
      const packageName = packageJson?.name ?? "";
      return new File(filePath, fileName, packageName);
    });
    this.files = files;
  }

  getAllPackages(): string[] {
    const set = new Set(this.files.map((file) => file.pacakgeName));
    return Array.from(set);
  }

  getFilesByPackages(packages: string[]): File[] {
    return this.files.filter((file) => packages.includes(file.pacakgeName));
  }

  async commit(files: File[], commitMessage: string) {
    const filePaths = files.map((file) => file.filePath);
    await this.git.add(filePaths);
    await this.git.commit(commitMessage);
  }
}

/**
 * 1. Select pacakges:
 *      - .(root)
 *      - a
 *      - b
 * 2. Which files to commit:
 *      - .(root): haha.js
 *      - myreactapp: apps/myreactapp/index.js
 * 3. Select type: feat, chore ...
 * 4. Input commit message: add a new feature
 */
class View {
  private onCancelPrompts() {
    process.exit(0);
  }

  async askSelectPacakges(packageNames: string[]): Promise<string[]> {
    const choices: Choice[] = packageNames.map((name) => ({
      title: name || ".(root)",
      value: name,
      selected: true,
    }));

    const res = await prompts(
      {
        name: "packages",
        type: "multiselect",
        message: "📦️ Select pacakges",
        hint: "- Space to toggle selection",
        choices,
        instructions: false,
      },
      { onCancel: this.onCancelPrompts },
    );

    return res.packages;
  }

  async askSelectFiles(files: File[]): Promise<File[]> {
    const choices: Choice[] = files.map((file) => ({
      title: `${file.pacakgeName || ".(root)"}: ${file.filePath}`,
      description: file.fileName,
      value: file,
      selected: true,
    }));

    const res = await prompts(
      {
        name: "files",
        type: "multiselect",
        message: "📝 Which files to commit",
        hint: "- Space to toggle selection",
        choices,
        instructions: false,
      },
      { onCancel: this.onCancelPrompts },
    );

    return res.files;
  }

  async askPickCommitType(
    types: {
      emoji: string;
      type: string;
      title: string;
      description: string;
    }[],
  ): Promise<string> {
    const choices: Choice[] = types.map((type) => ({
      title: type.type,
      description: `${type.emoji} ${type.title}`,
      value: type.type,
    }));

    const res = await prompts(
      {
        name: "type",
        type: "autocomplete",
        message: "💎 Pick a commit type",
        choices,
        instructions: false,
      },
      { onCancel: this.onCancelPrompts },
    );

    return res.type;
  }

  async askInputDescription(): Promise<string> {
    const res = await prompts(
      {
        name: "description",
        type: "text",
        message: "💬 Input commit description",
      },
      { onCancel: this.onCancelPrompts },
    );

    return res.description;
  }
}

class Controller {
  constructor(
    private readonly model: Model,
    private readonly view: View,
  ) {}

  async run() {
    await this.model.scan();

    // 1.
    const allPackages = this.model.getAllPackages();
    const selectedPackages = await this.view.askSelectPacakges(allPackages);

    if (!selectedPackages.length) return;

    // 2.
    const files = this.model.getFilesByPackages(selectedPackages);
    const selectedFiles = await this.view.askSelectFiles(files);

    if (!selectedFiles.length) return;

    // 3.
    const commitTypes = Object.entries(EMOJI_MAP).map(([type, info]) => ({
      type,
      ...info,
    }));
    const type = await this.view.askPickCommitType(commitTypes);

    // 4.
    const description = await this.view.askInputDescription();

    const scope = selectedPackages.length
      ? `(${selectedPackages.map((name) => name || "root").join(", ")})`
      : "";

    const commitMessage = `${type}${scope}: ${description}`;

    await this.model.commit(selectedFiles, commitMessage);
    console.log("✅ Done!");
  }
}

if (import.meta.main) {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
  controller.run();
}
