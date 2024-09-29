const fs = require('fs');
const path = require('path');
const util = require('./util');

// const conf = require('../config');
const apProp = require('./apPropertyObject');

const doJob = (LocalPath: string, version: string, javaOpts: string) => {
  //   console.log("FileManager Start it's job.! with Path = ", LocalPath, conf);

  const basePath = generateBaseDirectory(LocalPath, version);
  console.log('Complete create base folders.');

  console.log(
    '주요 파일 이름',
    apProp.agent.file.name.exe,
    apProp.agent.file.name.bat,
    apProp.agent.file.name.vbs
  );
  createBATfile(apProp.agent.file.name.bat, javaOpts);
  createVBAfile(apProp.agent.file.name.bat, apProp.agent.file.name.vbs);
  createRegAddBATfile(
    'ServiceABS',
    apProp.agent.file.name.vbs,
    apProp.agent.file.name.reg
  );

  console.log("FileManager End It's Job.");
};

/**
 * Local 디렉토리를 만들고, 각 주요 파일 경로를 생성하여 evn에 저장한다.
 * @param LocalPath
 * @returns
 */
const generateBaseDirectory = (LocalPath: string, version: string) => {
  console.log('start generateBaseDirectory ', LocalPath, version);
  // 1. Sellter Base dir 만들기
  const basePath = util.createDirectory(LocalPath, apProp.agent.file.path.base);
  console.log('basePath ', basePath);

  // 1- 버전 만들기
  const servicePath = util.createDirectory(basePath, version);
  console.log('servicePath ', servicePath);
  process.env.SRV_HOME = servicePath;

  // 2, bin 적재 dir 만들기
  const binPath = util.createDirectory(servicePath, apProp.agent.file.path.bin);
  console.log('binPath ', binPath);
  process.env.SRV_BIN = binPath;

  // 3. data dir 만들기
  const dataPath = util.createDirectory(
    servicePath,
    apProp.agent.file.path.data
  );
  process.env.SRV_DATA = dataPath;

  // 4. conf dir 만들기
  const confPath = util.createDirectory(
    servicePath,
    apProp.agent.file.path.conf
  );
  process.env.SRV_CONF = confPath;

  // 5. traget dir 만들기
  const targetPath = util.createDirectory(
    servicePath,
    apProp.agent.file.path.target
  );
  process.env.SRV_TARGET = targetPath;

  // 6. traget dir 만들기
  const logPath = util.createDirectory(servicePath, apProp.agent.file.path.log);
  process.env.SRV_LOG = logPath;

  return servicePath;
};

const createRegAddBATfile = (
  scriptName: string,
  vbsFileNM: string,
  regiAddFileNm: string
) => {
  console.log('Start Create RegiAdd BAT file.' + process.env.SRV_BIN);

  const content = util.formatString(
    apProp.agent.file.content.reg,
    scriptName,
    process.env.SRV_BIN,
    path.sep,
    vbsFileNM
  );

  util.writeFile(process.env.SRV_BIN, regiAddFileNm, content);
};

/**
 * BAT 파일 생성
 * @param batFileNM
 */
const createBATfile = (batFileNM: string, javaOpts: string) => {
  console.log('Start Create BAT file.' + process.env.SRV_BIN);

  const content = util.formatString(
    apProp.agent.file.content.bat,
    'ServiceName',
    process.env.SRV_BIN + path.sep + 'Java EXECUTE FILE Bin 까지',
    process.env.SRV_BIN + path.sep + 'JAR 경로',
    process.env.SRV_LOG,
    javaOpts,
    process.env.SRV_CONF
  );

  util.writeFile(process.env.SRV_BIN, batFileNM, content);
};

/**
 *
 * @param batFileNM
 * @param vbsFileNM
 */
const createVBAfile = (batFileNM: string, vbsFileNM: string) => {
  console.log('Start Create VBA file.' + process.env.SRV_BIN);

  const content = util.formatString(
    apProp.agent.file.content.vbs,
    process.env.SRV_BIN,
    path.sep,
    batFileNM
  );

  util.writeFile(process.env.SRV_BIN, vbsFileNM, content);
};

module.exports = { doJob };
