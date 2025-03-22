import fs from "fs-extra";
import webpackPaths from "../configs/webpack.paths";

const foldersToRemove = [
  webpackPaths.distPath,
  webpackPaths.buildPath,
  webpackPaths.dllPath,
];

foldersToRemove.forEach((folder) => {
  if (fs.existsSync(folder)) {
    fs.removeSync(folder);
  }
});
