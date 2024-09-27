import { OperationType } from 'config/interfaces/IpcMessageData';

const commands = require('../code/IpcCommands');
const {
  BizAgentJob,
  OperationType,
} = require('../config/interfaces/IpcMessageData');
const fileMng = require('./managers/fileManager');
const downMng = require('./managers/downloadManager');
const portMng = require('./managers/servicePortManager');

const bizHandler = (eventName: string, payload: BizAgentJob) => {
  switch (payload[0]['type']) {
    case OperationType.INSTALL: // Agent 설치 작업
      console.log('Call Install Job.');
      callInstallJob();
      return 'Start INSTALL WORK!.';
      break;
    case OperationType.UNINSTALL: // Agent 설치 작업
      console.log('Call UNINSTALL Job.');
      break;
    case OperationType.UPDATE: // Agent 설치 작업
      console.log('Call UPDATE Job.');
      break;
    default:
      console.log('Undefined Job. ', eventName, payload);
      break;
  }
};

/**
 * Excute job, Install service.
 */
const callInstallJob = () => {
  const LocalPath = process.env.LOCALAPPDATA;
  console.log(LocalPath);

  // // 1. Server 부터 Version 정보 요청 by using sync request.
  // const syncReq = require('sync-request');
  // // const latestVersion = syncReq('GET', 'http://34.64.163.97:8080/agent/version');
  // const latestVersion = syncReq('GET', 'http://localhost:8887/agent/version');
  // console.log(latestVersion.getBody('utf8'));

  const version = '1.0.0';
  /**
   * Run File Manager
   */
  fileMng.doJob(LocalPath, version);
  console.log('[Installer]File Manager Done.');

  /**
   * Run Download Manager
   */
  downMng.doJob(exeFileNM);
  console.log('[Installer]Download Manager Done.');

  const recommandedPort = '8080';
  // TODO 서버에서 공통 포트 받기
  /**
   * 서버에 저장된 추천 포트 받기
   */
  portMng.doJob();
};

module.exports = { bizHandler };
