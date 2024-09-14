/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const sendIpcTestMessage = () => {
  console.log('Click send button from UI.');
  window.electron.ipcRenderer.sendMessage('TEST_MESSAGE_SEND2', []);
};

const IpcTest = () => {
  const [messageFromMain, setMessageFromMain] = useState<string | null>(null);

  useEffect(() => {
    if (window.electron) {
      // Listen for the reply from the main process
      window.electron.ipcRenderer.on('TEST_MESSAGE_SEND2', (event, message) => {
        console.log(event, message);
        setMessageFromMain(event); // Set the message received from main
        console.log(messageFromMain);
      });

      // Clean up the listener when component unmounts
      return () => {
        window.electron.ipcRenderer.removeAllListeners('TEST_MESSAGE_SEND2');
      };
    }
  }, []);

  return (
    <div>
      <button onClick={sendIpcTestMessage}>Click Me</button>
      <h1>message: {messageFromMain}</h1>
    </div>
  );
};

export default IpcTest;
