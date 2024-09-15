const commands = require('../code/IpcCommands');
const fileMng = require('./managers/file');
const downMng = require('./managers/download');

const bizHandler = (eventName: String, args: []) => {
  console.log(eventName, args);

  switch (eventName) {
    case commands.BIZ_AGENT_INSTALL:
      console.log('Call Install Job.');
    default:
      console.log('Undefined Job. ', eventName, args);
  }
};

module.exports = { bizHandler };
