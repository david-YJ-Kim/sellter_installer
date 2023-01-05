const fs = require("fs");
const path = require("path");

const createDirectory = (basePath, directoryName) => {
    console.log(basePath, directoryName, path.sep);
    const targetDirectory = basePath + path.sep + directoryName;

    console.log(targetDirectory);
    if (!fs.existsSync(targetDirectory)) {
        console.log("File is not exists");
        fs.mkdirSync(targetDirectory);
        createDirectory(basePath, directoryName);
    } else {
        console.log("File has been created.");
    }
    return targetDirectory;
};

const writeFile = (path, fileName, content) => {
    console.log(path, fileName);
    // const direactoryPath = `${app.getPath('appData')}/electronTest/test`;
    const file = `${path}/${fileName}`;

    // direactoryPath에 해당하는 폴더가 있는지 확인하고, 없는 경우 생성
    // !fs.existsSync(path) && fs.mkdirSync(path);

    // 동기 쓰기
    fs.writeFileSync(file, content);

    // 비동기 쓰기
    // fs.writeFile(text, content, (err) => {
    //     if (err) console.error(err);
    // });
};

module.exports = { createDirectory, writeFile };
