const fs = require('fs');
const path = require('path');
const util = require('./util');

// const conf = require('../config');
const apProp = require('./apPropertyObject');

const doJob = (LocalPath: string, version: string) => {
  //   console.log("FileManager Start it's job.! with Path = ", LocalPath, conf);

  const basePath = generateBaseDirectory(LocalPath, version);

  console.log(
    '주요 파일 이름',
    apProp.agent.file.name.exe,
    apProp.agent.file.name.bat,
    apProp.agent.file.name.vbs
  );
  createBATfile(apProp.agent.file.name.exe, apProp.agent.file.name.bat);
  createVBAfile(apProp.agent.file.name.bat, apProp.agent.file.name.vbs);

  console.log("FileManager End It's Job.");
};

/**
 * Local 디렉토리를 만들고, 각 주요 파일 경로를 생성하여 evn에 저장한다.
 * @param LocalPath
 * @returns
 */
const generateBaseDirectory = (LocalPath: string, version: string) => {
  // 1. Sellter Base dir 만들기
  util.createDirectory(LocalPath, apProp.agent.file.path.base);
  const basePath = LocalPath + path.sep + apProp.agent.file.path.base;
  process.env.AGENT_HOME = basePath;

  // 2, bin 적재 dir 만들기
  const binPath = util.createDirectory(basePath, apProp.agent.file.path.bin);
  process.env.SELLTER_BIN = binPath;

  // 3. data dir 만들기
  const dataPath = util.createDirectory(basePath, apProp.agent.file.path.data);
  process.env.SELLTER_DATA = dataPath;
  return basePath;
};

/**
 * BAT 파일 생성
 * @param exeFileNM
 * @param batFileNM
 */
const createBATfile = (exeFileNM: string, batFileNM: string) => {
  console.log('Start Create BAT file.' + process.env.SELLTER_BIN);

  const batContentSample = `@echo off
  echo "Start Agent"
  start /d "${process.env.SELLTER_BIN}" /b ${exeFileNM}`;
  util.writeFile(process.env.SELLTER_BIN, batFileNM, batContentSample);
};

const createVBAfile = (batFileNM, vbsFileNM) => {
  console.log('Start Create VBA file.' + process.env.SELLTER_BIN);

  const vbaContentSample = `
  Set objShell = CreateObject("Shell.Application")
objShell.ShellExecute "${process.env.SELLTER_BIN}${path.sep}${batFileNM}", "/c lodctr.exe /r" , "", "runas", 0
`;
  util.writeFile(process.env.SELLTER_BIN, vbsFileNM, vbaContentSample);
};
module.exports = { doJob };
