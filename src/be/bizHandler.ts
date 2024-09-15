import IpcCommands from 'code/IpcCommands';
import { OperationType } from 'config/interfaces/IpcMessageData';

const commands = require('../code/IpcCommands');
const {
  BizAgentJob,
  OperationType,
} = require('../config/interfaces/IpcMessageData');
const fileMng = require('./managers/file');
const downMng = require('./managers/download');

const bizHandler = (eventName: string, payload: BizAgentJob) => {
  switch (payload[0]['type']) {
    case OperationType.INSTALL: // Agent 설치 작업
      console.log('Call Install Job.');
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

module.exports = { bizHandler };
