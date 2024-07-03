const fs = require("fs");
const path = require("path");
const util = require("./util");

const doJob = (LocalPath, exeFileNM, vbsFileNM) => {


    const config = require("../../config/config")["springAgent"];



    console.log("FileManager Start it's job.! with Path = " + LocalPath);

    const basePath = createSellterDirectory(LocalPath);

    const batFileNM = "sellter_agent_start.bat";

    createBATfile(exeFileNM, batFileNM);
    createVBAfile(batFileNM, vbsFileNM);

    console.log("FileManager End It's Job.");
};

const createSellterDirectory = (LocalPath) => {
    // 1. Sellter Base dir 만들기
    util.createDirectory(LocalPath, "Sellter");
    const basePath = LocalPath + path.sep + "Sellter";
    process.env.SELLTER_HOME = basePath;

    // 2, bin 적재 dir 만들기
    const binPath = util.createDirectory(basePath, "bin");
    process.env.SELLTER_BIN = binPath;

    // 3. data dir 만들기
    const dataPath = util.createDirectory(basePath, "data");
    process.env.SELLTER_DATA = dataPath;
    return basePath;
};

const createBATfile = (exeFileNM, batFileNM) => {
    console.log("Start Create BAT file." + process.env.SELLTER_BIN);

    const batContentSample = `@echo off
  echo "Start Agent"
  start /d "${process.env.SELLTER_BIN}" /b ${exeFileNM}`;
    util.writeFile(process.env.SELLTER_BIN, batFileNM, batContentSample);
};

const createVBAfile = (batFileNM, vbsFileNM) => {
    console.log("Start Create VBA file." + process.env.SELLTER_BIN);

    const vbaContentSample = `
  Set objShell = CreateObject("Shell.Application")
objShell.ShellExecute "${process.env.SELLTER_BIN}${path.sep}${batFileNM}", "/c lodctr.exe /r" , "", "runas", 0
`;
    util.writeFile(process.env.SELLTER_BIN, vbsFileNM, vbaContentSample);
};
module.exports = { doJob };
