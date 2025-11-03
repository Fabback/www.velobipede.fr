const fs = require("fs").promises;
const path = require("path");

const buildSrcPath = path.join(__dirname, ".next/standalone");
const buildDestPath = path.join(__dirname, ".dist");

const staticSrcPath = path.join(__dirname, ".next/static");
const staticDestPath = path.join(buildDestPath, ".next/static");

const publicSrcPath = path.join(__dirname, "public");
const publicDestPath = path.join(buildDestPath, "public");

function copyContent(src, dest, label) {
  return fs
    .mkdir(dest, { recursive: true })
    .then(() => fs.cp(src, dest, { recursive: true, dereference: true }))
    .then(() => console.log(`${greenTick} ${label} copied successfully`))
    .catch((err) =>
      console.error(`${redCross} Failed to copy ${label}: ${err}`),
    );
}

const greenTick = `\x1b[32m\u2713\x1b[0m`;
const redCross = `\x1b[31m\u274C\x1b[0m`;

fs.rm(buildDestPath, { force: true, recursive: true })
  .then(() => copyContent(buildSrcPath, buildDestPath, "BUILD"))
  .then(() => copyContent(staticSrcPath, staticDestPath, "STATIC"))
  .then(() => copyContent(publicSrcPath, publicDestPath, "PUBLIC"))
  .then(() => console.log(`${greenTick} ALL Assets copied successfully`))
  .catch((err) => console.error(`${redCross} Failed to copy assets: ${err}`));
