// REF
// : https://daehopark.tistory.com/entry/NodeJS-CryptoJS-AES-%EC%95%94%EB%B3%B5%ED%98%B8%ED%99%94-%EC%98%88%EC%A0%9C

const crpto = require("crypto-js");
const { ReadFile, WriteFile, ReadFile_pure } = require("../FileHandler");

let secretKey = "SECRET-KEY-FROM-SERVER";
let data = ReadFile(
  "C:/Users/tspsc/AppData/Roaming/Asell/CollectionRequest",
  "20221027102213868.json"
);
console.log("original:", data);

// encrypt
let encryptedData = crpto.AES.encrypt(
  JSON.stringify(data),
  secretKey
).toString();
console.log("encryptedData:", encryptedData);
WriteFile(
  "C:/Users/tspsc/AppData/Roaming/Asell/CollectionRequest",
  "20221027102213868_encrtpyted.json",
  encryptedData
);

// decrypt
let data_entrypted = ReadFile_pure(
  "C:/Users/tspsc/AppData/Roaming/Asell/CollectionRequest",
  "20221027102213868_encrtpyted.json"
);
let bytes = crpto.AES.decrypt(data_entrypted, secretKey);
let decryptedData = JSON.parse(bytes.toString(crpto.enc.Utf8));
console.log("decryptedData:", decryptedData);
