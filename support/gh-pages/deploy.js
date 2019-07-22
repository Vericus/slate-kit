import fse from "fs-extra";
import fs from "fs";
import path from "path";
import rmfr from "rmfr";
import ReactDOMServer from "react-dom/server";
import React from "react";
import compareVersions from "compare-versions";
import {
  chalkError,
  chalkSuccess,
  chalkWarning,
  chalkProcessing
} from "./chalkConfig";
import Directory from "./directory";

class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      // prettier-ignore
      this.stack = (new Error(message)).stack;
    }
  }
}

class WarningError extends ExtendableError {}

const exec = require("child-process-promise").exec;
const baseFolder = path.resolve(__dirname, "../../");
const storybookFolder = `${baseFolder}/storybook-static`;
const ghPagesFolder = `${baseFolder}/dist`;
const releasesFolder = `${ghPagesFolder}/releases`;
const releasesIndex = `${releasesFolder}/index.html`;
const latestFolder = `${ghPagesFolder}/latest`;
const mainIndex = `${ghPagesFolder}/index.html`;
const packageJson = require(path.resolve(__dirname, "../../package.json"));
const commitMsg = "[skip ci] update github pages with version ";

const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source =>
  fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);
const getBasename = source => source.map(directory => path.basename(directory));

async function checkLatestVersion() {
  await rmfr(ghPagesFolder);
  await exec("git worktree prune");
  await exec("git fetch --all");
  await exec("git worktree add -f --checkout dist gh-pages");
  await exec("cd dist && git pull");
  if (
    !fse.pathExistsSync(latestFolder) ||
    !fse.pathExistsSync(`${latestFolder}/version.json`)
  )
    return "0.0.0";
  const versionJSON = require(path.resolve(`${latestFolder}/version.json`));
  const version = versionJSON.version;
  return version;
}

async function createVersionFile(currentVersion) {
  return await fse.writeJson(`${storybookFolder}/version.json`, {
    version: currentVersion
  });
}

function indexPages(pages) {
  return ReactDOMServer.renderToString(<Directory pages={pages} />);
}

async function indexReleases() {
  const releases = getBasename(getDirectories(releasesFolder));
  fs.writeFileSync(releasesIndex, indexPages(releases));
}

async function indexMain() {
  const mains = getBasename(getDirectories(ghPagesFolder));
  fs.writeFileSync(mainIndex, indexPages(mains));
}

async function tagCurrentVersion(currentVersion, latestVersion) {
  if (compareVersions(currentVersion, latestVersion) !== 1)
    throw new WarningError(
      "gh pages already up to date or you forgot to update version on your main package.json"
    );
  await createVersionFile(currentVersion);
  await fse.copy(storybookFolder, latestFolder);
  await fse.copy(storybookFolder, `${releasesFolder}/${currentVersion}`);
  await indexMain();
  await indexReleases();
}

async function pushToGHPages(version) {
  await exec(
    `cd dist && git add --all && git commit -m "${commitMsg} ${version}" && git push origin gh-pages`
  );
}
async function cleanup() {
  await rmfr(ghPagesFolder);
  await exec("git worktree prune");
}

async function deploy() {
  const latestVersion = await checkLatestVersion();
  const currentVersion = packageJson.version;
  await tagCurrentVersion(currentVersion, latestVersion);
  await pushToGHPages(currentVersion);
  await cleanup();
}
console.log(
  chalkProcessing("Updating github pages. This will take a moment...")
);

deploy()
  .then(() => {
    console.log(chalkSuccess("Your github pages has been updated"));
    return 0;
  })
  .catch(async err => {
    await cleanup();
    if (err instanceof WarningError) {
      console.log(chalkWarning(err));
    } else {
      console.log(chalkError(err));
    }
    return 1;
  });
