import { prop } from 'cheerio/lib/api/attributes';

const { ProvInstallFileType } = require('../../config/interfaces/ProvisionIvo');

const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');
const path = require('path');
const decompress = require('decompress');
const pm = require('./process/index');
const apProp = require('./apPropertyObject');
// const AdmZip = require('adm-zip');
// const baseFile = process.env.SELLTER_BIN + path.sep;  // 여기서는 ENV 가 안먹네.?

/**
 * Agent 설치를 위해 필요한 파일 다운로드 요청
 * 1. 서비스 jar 파일
 * 2. java 실행 파일
 * 3. 서비스 property 파일
 * 4. 서비스 data 파일 (sqlite3)
 */
const doJob = () => {
  // const env = process.env.ENV;
  console.log("[>dm]Download Manager  Start it's job.!");

  console.log(apProp.server);
  // ==> initialize가 안된거 같음

  const propServer = apProp.agent.server;
  const propFile = apProp.agent.file.name;

  // http://localhost:16001/provision/PROV_INSTALL_FILE_REQ?type=DATA
  const baseURI = `${propServer.ip}:${propServer.port}/${propServer.uri.download.prefix}/${propServer.uri.download.downReq}?type=`;

  console.log(baseURI);

  const javaDownUrl = baseURI + ProvInstallFileType.JAVA;
  const jarDownUrl = baseURI + ProvInstallFileType.JAR;
  const propDownUrl = baseURI + ProvInstallFileType.PROP;
  const dataDownUrl = baseURI + ProvInstallFileType.DATA;
  console.log(javaDownUrl, jarDownUrl, propDownUrl, dataDownUrl);

  // JAVA Downlaod
  downloadFiles(javaDownUrl, global.SRV_BIN, propFile.jdk);
  downloadFiles(jarDownUrl, global.SRV_TARGET, propFile.jar);
  downloadFiles(propDownUrl, global.SRV_CONF, propFile.prop);
  downloadFiles(dataDownUrl, global.SRV_DATA, propFile.data);

  // const exeFileNM = 'SellterAgent.exe';
  // const libraryZipNM = 'source.zip';
  // const regiFileNM = 'regiAdd_startProgram.bat';

  // const file = fs.createWriteStream(baseFile + exeFileNM);
  // const request = http.get(agentDownRequetURI, function (response) {
  //   response.pipe(file);

  //   // after download completed close filestream
  //   file.on('finish', () => {
  //     file.close();

  //     console.log('[>dm]Download Completed', baseFile + exeFileNM);
  //     downloadLibFiles(sourceDownRequestURI, baseFile + libraryZipNM);

  //     if ((baseFile + exeFileNM).includes('.zip')) {
  //       // unzipFile(libraryZipNM);
  //     }
  //   });
  // });

  // downloadRegFiles(regiAddDownRequetURI, baseFile + regiFileNM);

  console.log("[>dm]Download Manager End It's Job.");
};

/**
 * 서버로 요청하여 응답을 받아서
 * 목적지 파일에 저장한다.
 * @param requestUrl
 * @param filePath
 * @param fileName
 */
const downloadFiles = (
  requestUrl: string,
  filePath: string,
  fileName: string
) => {
  console.log(
    'Request service files. url: {}, downloadPath: {}, fileName: {}',
    requestUrl,
    filePath,
    fileName
  );

  const file = fs.createWriteStream(filePath + path.sep + fileName);
  const request = http.get(requestUrl, function (response) {
    console.log(response);
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();
      console.log('[>dm]Download Completed', filePath);

      if (fileName.includes('.zip')) {
        console.log('Unzip Start ', fileName);
        const zipFilePath = path.join(global.SRV_BIN, fileName);
        // const zip = new AdmZip(zipFilePath);
        // try {
        //   zip.extractAllTo(global.SRV_JDK, true);
        //   console.log('[>dm] Completed Unzip.');
        // } catch (error) {
        //   console.error('Error during unzip:', error);
        // }

        console.log('[>dm]Completed Unzip.');
      }
    });
  });

  // Handle request errors
  request.on('error', (err) => {
    console.error('Error during HTTP request:', err);
  });
};

// const downloadLibFiles = (requetURI, filePath) => {
//   console.log(requetURI, filePath);

//   const file = fs.createWriteStream(filePath);
//   const request = http.get(requetURI, function (response) {
//     response.pipe(file);

//     // after download completed close filestream
//     file.on('finish', () => {
//       file.close();
//       console.log('[>dm]Download Completed', filePath);

//       if (filePath.includes('.zip')) {
//         unzipFile('source.zip');
//         console.log('[>dm]Completed Unzip.');
//       }
//       console.log('****************** PM Start');
//       pm.doJob();
//     });
//   });
// };

// const downloadRegFiles = (requetURI, filePath) => {
//   console.log(requetURI, filePath);

//   const file = fs.createWriteStream(filePath);
//   const request = http.get(requetURI, function (response) {
//     response.pipe(file);

//     // after download completed close filestream
//     file.on('finish', () => {
//       file.close();

//       console.log('[>dm]Download Completed', filePath);

//       if (filePath.includes('.bat')) {
//         const exec = require('child_process').execSync; // 프로그램 찾을때 쓸 프로세스
//         const cmd =
//           filePath +
//           ' ' +
//           process.env.SELLTER_BIN +
//           path.sep +
//           'run_background.vbs';
//         exec(cmd, (err, stdout, stderr) => {
//           if (err) {
//             console.log(`exec error: ${err}`);
//           } else {
//             console.log('stdout:', cmd, '\n', stdout);
//           }
//         });
//         console.log('[>dm]Completed Register Start Program.');
//       }
//     });
//   });
// };

// const downloadFiles = (requetURI, filePath) => {
//   console.log(requetURI, filePath);

//   const file = fs.createWriteStream(filePath);
//   const request = http.get(requetURI, function (response) {
//     response.pipe(file);

//     // after download completed close filestream
//     file.on('finish', () => {
//       file.close();

//       console.log('[>dm]Download Completed', filePath);

//       if (filePath.includes('.zip')) {
//         unzipFile(libraryZipNM);
//       }
//     });
//   });
// };

// function unzipFile(libraryZipNM: string) {
//   return new Promise((resolve, reject) => {
//     console.log('[>dm]Start Unzip Target Files');

//     const zipFilePath = path.join(global.SRV_BIN, libraryZipNM);

//     // 압축 파일이 존재하는지 확인
//     if (!fs.existsSync(zipFilePath)) {
//       console.error(`Error: ZIP file does not exist at ${zipFilePath}`);
//       return;
//     }

//     const zip = new AdmZip(zipFilePath);
//     zip.extractAllTo(global.SRV_JDK);
//     return;
//     // decompress(zipFilePath, global.SRV_JDK)
//     //   .then((files) => {
//     //     console.log('Unzip successful:', files);
//     //   })
//     //   .catch((error) => {
//     //     console.error('Error While Unzip ', error);
//     //   });
//   });
// }

// const unzipFile = (libraryZipNM: string) => {
//   console.log('[>dm]Start Unzip Target Files');

//   const zipFilePath = path.join(global.SRV_BIN, libraryZipNM);

//   // 압축 파일이 존재하는지 확인
//   if (!fs.existsSync(zipFilePath)) {
//     console.error(`Error: ZIP file does not exist at ${zipFilePath}`);
//     return;
//   }

//   decompress(zipFilePath, global.SRV_JDK)
//     .then((files) => {
//       console.log('Unzip successful:', files);
//     })
//     .catch((error) => {
//       console.error('Error While Unzip ', error);
//     });
// };

module.exports = { doJob };
