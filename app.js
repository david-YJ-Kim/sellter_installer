const fm = require("./managers/file");
const dm = require("./managers/download");


console.log("[Installer]Welcome Sellter Agent Installer");
console.log("[Installer]Start Install..... Sellter Agent");

const LocalPath = process.env.LOCALAPPDATA;
console.log(LocalPath);

const exeFileNM = "SellterAgent.exe";
const vbsFileNM = "run_background.vbs";


// 1. Server 부터 Version 정보 요청 by using sync request.
const syncReq = require("sync-request");
// const latestVersion = syncReq('GET', 'http://34.64.163.97:8080/agent/version');
const latestVersion = syncReq('GET', 'http://localhost:8887/agent/version');
console.log(latestVersion.getBody('utf8'));

// 2. 기존 버전 정보조회 (Find Directory)0

// 3. If there is a directory same name with request Version, make file name Version - numbering

// 4. Do Install Job.

/**
 * Run File Manager
 */
fm.doJob(LocalPath, exeFileNM, vbsFileNM);
console.log("[Installer]File Manager Done.");

/**
 * Run Download Manager
 */
dm.doJob(exeFileNM);
console.log("[Installer]Download Manager Done.");

// console.log(
//   process.env.APPDATA ||
//     (process.platform == "darwin"
//       ? process.env.HOME + "/Library/Preferences"
//       : process.env.HOME + "/.local/share")
// );
