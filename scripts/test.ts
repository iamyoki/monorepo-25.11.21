import { simpleGit } from "simple-git";

(async function () {
  const git = simpleGit();
  const status = await git.status();
  console.log(status.files);
  //
})();
