const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');
const path = require('path');
const decompress = require('decompress');
const pm = require('./process/index');
const apProp = require('./apPropertyObject');
// const baseFile = process.env.SELLTER_BIN + path.sep;  // 여기서는 ENV 가 안먹네.?

const doJob = () => {
  // const dotenv = require("dotenv");
  // dotenv.config();
  // console.log(process.env.ENV);
  // process.env.DEV => 요거 undefined. .. dotenv가 안먹는다는 이야긴데..?

  // const env = process.env.ENV;
  console.log("[>dm]Download Manager  Start it's job.!");

  console.log(apProp.server);
  // ==> initialize가 안된거 같음

  // const baseURI = "http://localhost:8887/download/";
  const baseURI = `${apProp.server.ip}:${apProp.server.port}`;
  console.log(baseURI);
  const agentDownRequetURI = baseURI + 'agent/';
  const sourceDownRequestURI = baseURI + 'source/';
  const regiAddDownRequetURI = baseURI + 'regiAdd/';

  const baseFile = process.env.SELLTER_BIN + path.sep;
  const exeFileNM = 'SellterAgent.exe';
  const libraryZipNM = 'source.zip';
  const regiFileNM = 'regiAdd_startProgram.bat';

  const file = fs.createWriteStream(baseFile + exeFileNM);
  const request = http.get(agentDownRequetURI, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();

      console.log('[>dm]Download Completed', baseFile + exeFileNM);
      downloadLibFiles(sourceDownRequestURI, baseFile + libraryZipNM);

      if ((baseFile + exeFileNM).includes('.zip')) {
        // unzipFile(libraryZipNM);
      }
    });
  });

  downloadRegFiles(regiAddDownRequetURI, baseFile + regiFileNM);

  console.log("[>dm]Download Manager End It's Job.");
};

const downloadLibFiles = (requetURI, filePath) => {
  console.log(requetURI, filePath);

  const file = fs.createWriteStream(filePath);
  const request = http.get(requetURI, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();
      console.log('[>dm]Download Completed', filePath);

      if (filePath.includes('.zip')) {
        unzipFile('source.zip');
        console.log('[>dm]Completed Unzip.');
      }
      console.log('****************** PM Start');
      pm.doJob();
    });
  });
};

const downloadRegFiles = (requetURI, filePath) => {
  console.log(requetURI, filePath);

  const file = fs.createWriteStream(filePath);
  const request = http.get(requetURI, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();

      console.log('[>dm]Download Completed', filePath);

      if (filePath.includes('.bat')) {
        const exec = require('child_process').execSync; // 프로그램 찾을때 쓸 프로세스
        const cmd =
          filePath +
          ' ' +
          process.env.SELLTER_BIN +
          path.sep +
          'run_background.vbs';
        exec(cmd, (err, stdout, stderr) => {
          if (err) {
            console.log(`exec error: ${err}`);
          } else {
            console.log('stdout:', cmd, '\n', stdout);
          }
        });
        console.log('[>dm]Completed Register Start Program.');
      }
    });
  });
};

const downloadFiles = (requetURI, filePath) => {
  console.log(requetURI, filePath);

  const file = fs.createWriteStream(filePath);
  const request = http.get(requetURI, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();

      console.log('[>dm]Download Completed', filePath);

      if (filePath.includes('.zip')) {
        unzipFile(libraryZipNM);
      }
    });
  });
};

const unzipFile = (libraryZipNM) => {
  console.log('[>dm]Start Unzip Target Files');

  decompress(
    process.env.SELLTER_BIN + path.sep + libraryZipNM,
    process.env.SELLTER_BIN
  )
    .then((files) => {
      // console.log(files);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { doJob };
