const fs = require("fs");
const { json } = require("react-router-dom");
const {
  PATH_BASE,
  DIR_ITEM_STORE,
  DIR_REQUEST_STORE,
} = require("../../code/DirectoryPath");

// REF
// https://velog.io/@yijaee/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B0%98-%EC%9D%BC%EB%A0%89%ED%8A%B8%EB%A1%A0%EC%97%90%EC%84%9C-filesystem-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0

const WriteFile = (path, fileName, content) => {
  console.log(path, fileName);
  // const direactoryPath = `${app.getPath('appData')}/electronTest/test`;
  const text = `${path}/${fileName}`;

  // direactoryPath에 해당하는 폴더가 있는지 확인하고, 없는 경우 생성
  // !fs.existsSync(path) && fs.mkdirSync(path);

  // 동기 쓰기
  fs.writeFileSync(text, content);

  // 비동기 쓰기
  // fs.writeFile(text, content, (err) => {
  //     if (err) console.error(err);
  // });
};

// 수정요
const CreateDirectory = (path) => {
  console.log(path);

  !fs.existsSync(path) && fs.mkdirSync(path);

  // !fs.existsSync(directoryPath) && fs.mkdir(directoryPath, (err) => {
  //     console.error(err);
  // });
};

const ReadFile = (path, fileName) => {
  console.log(`Path :${path} FileName : ${fileName}`);

  const targetFile = `${path}/${fileName}`;

  // Sync
  const jsonString = fs.readFileSync(targetFile.toString()).toString();
  return JSON.parse(jsonString);

  // ASync
  // fs.readFile(text, (err, data) => {
  //   if (err) console.error(err);
  //   console.log(data.toString());
  // });
};

const ReadFile_pure = (path, fileName) => {
  console.log(`Path :${path} FileName : ${fileName}`);

  const targetFile = `${path}/${fileName}`;

  // Sync
  return fs.readFileSync(targetFile.toString()).toString();

  // ASync
  // fs.readFile(text, (err, data) => {
  //   if (err) console.error(err);
  //   console.log(data.toString());
  // });
};

// Show Collection Requests Info List
const GetFileNameAndItsContent = (path) => {
  const list = [];
  let i = 0;
  fs.readdirSync(path).forEach((name) => {
    const targetFile = `${path}/${name}`;

    const jsonString = fs.readFileSync(targetFile.toString()).toString();
    const data = JSON.parse(jsonString);

    if (data.targetItemIdList !== undefined) {
      if (data.targetItemIdList.length !== data.targetIdCount) {
        data.targetIdCount = data.targetItemIdList.length;
        WriteFile(
          `${PATH_BASE}/${DIR_REQUEST_STORE}`,
          `${data.id}.json`,
          JSON.stringify(data)
        );
      }
    }

    // modify data for complete scrap item count

    if (
      data.ItemIdFlag &&
      IsDirExist(`${PATH_BASE}/${DIR_ITEM_STORE}/${data.id}`)
    ) {
      const fileCount = GetFilesCount(
        `${PATH_BASE}/${DIR_ITEM_STORE}/${data.id}`
      );

      if (data.storedItemInfo !== fileCount) {
        data.storedItemInfo = fileCount;
        WriteFile(
          `${PATH_BASE}/${DIR_REQUEST_STORE}`,
          `${data.id}.json`,
          JSON.stringify(data)
        );
      }
    }

    try {
      list[i] = data;
    } catch (err) {
      console.log("error :", err);
      // console.log(targetFile);
      // console.log(jsonString);
    }
    i++;

    // fs.readFile(targetFile, (err, data) => {
    //   if (err) console.error(err);
    //   console.log(data.toString());
    // });
  });
  return list;
};
const GetFilesCount = (path) => {
  return fs.readdirSync(path).length;
};

const GetFileList = (path) => {
  return fs.readdirSync(path);

  // 비동기
  // const response = fs.readdir(path, function(error, list){
  //   if(error) throw error;
  //   console.log(`FileHandle.JS : ${list}`);
  // });
  // return response;
};

const IsDirExist = (path) => {
  // const direactoryPath = `${app.getPath('appData')}/electronTest/test`;

  return fs.existsSync(path);
};

module.exports = {
  WriteFile,
  ReadFile,
  GetFileList,
  GetFileNameAndItsContent,
  CreateDirectory,
  ReadFile_pure,
};
