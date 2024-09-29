import { OperationType } from 'config/interfaces/IpcMessageData';

const axios = require('axios');

// const syncReq = require('sync-request');

const commands = require('../code/IpcCommands');
const {
  BizAgentJob,
  OperationType,
} = require('../config/interfaces/IpcMessageData');
const fileMng = require('./managers/fileManager');
const downMng = require('./managers/downloadManager');
const portMng = require('./managers/servicePortManager');
const apConf = require('./managers/apPropertyObject');

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
const callInstallJob = async () => {
  const LocalPath = process.env.LOCALAPPDATA;

  const ip = apConf.agent.server.ip;
  const port = apConf.agent.server.port;
  const downloadUri = apConf.agent.server.uri.download;
  const prefix = downloadUri.prefix;
  const ipPort = `${ip}:${port}`;

  // 1. Server로 설치 정보 조회
  const requestInstallInfoUrl = `${ipPort}/${prefix}/${downloadUri.getInfo}`;
  const axiosResponse = await axios.get(requestInstallInfoUrl);

  const provInstallInfoRepIvo = axiosResponse.data;

  console.log(
    "resquest to url and it's result",
    requestInstallInfoUrl,
    provInstallInfoRepIvo
  );

  // // 1. Server 부터 Version 정보 요청 by using sync request.
  // const syncReq = require('sync-request');
  // // const latestVersion = syncReq('GET', 'http://34.64.163.97:8080/agent/version');
  // const latestVersion = syncReq('GET', 'http://localhost:8887/agent/version');
  // console.log(latestVersion.getBody('utf8'));

  const version = provInstallInfoRepIvo.body.version;
  const servicePort = provInstallInfoRepIvo.body.servicePort;
  const satellitePort = provInstallInfoRepIvo.body.satellitePort;
  const javaOpts = provInstallInfoRepIvo.body.javaOptions;
  console.log(version, servicePort, satellitePort, javaOpts);

  /**
   * Run File Manager
   */
  fileMng.doJob(LocalPath, version, javaOpts);
  console.log('[Installer]File Manager Done.');

  /**
   * Run Download Manager
   */
  // const exeFileNM = '서버에서 획득 필요';
  downMng.doJob();
  console.log('[Installer]Download Manager Done.');

  // TODO 서버에서 공통 포트 받기
  /**
   * 서버에 저장된 추천 포트 받기
   */
  const availableServicePort = portMng.findAvailablePortSync(servicePort);

  console.log(availableServicePort);
};

module.exports = { bizHandler };
