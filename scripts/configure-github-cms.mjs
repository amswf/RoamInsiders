import { readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const templateUrl = new URL("../public/admin/config.template.yml", import.meta.url);
const outputUrl = new URL("../public/admin/config.yml", import.meta.url);

function repositoryFromRemote() {
  try {
    const remote = execFileSync("git", ["remote", "get-url", "origin"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const match = remote.match(/github\.com[/:]([^/]+\/[^/.]+)(?:\.git)?$/i);
    return match?.[1] || "YOUR_GITHUB_ACCOUNT/RoamInsiders";
  } catch {
    return "YOUR_GITHUB_ACCOUNT/RoamInsiders";
  }
}

const repository = process.env.GITHUB_REPOSITORY || repositoryFromRemote();
const template = await readFile(templateUrl, "utf8");
const publicBasePath = process.env.PAGES_BASE_PATH || "";
await writeFile(
  outputUrl,
  template
    .replaceAll("__GITHUB_REPOSITORY__", repository)
    .replaceAll("__PUBLIC_BASE_PATH__", publicBasePath),
);
