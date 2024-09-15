// const dayjs = require('dayjs');
// const { WriteFile, CreateDirectory, GetFileList, GetFileNameAndContent } = require('../js/function/FileHandler.js');
// const { GetProductIDList } = require('../js/function/GetProductIDs.js');
//
//
// function test_gatherItemInfo(){
//
//     // given
//     const url = 'http://www.naver.com';
//     const keyword = 'man-clothes';
//     const minPrice = 10;
//     const maxPrice = 100;
//     const pageLimit = 2;
//     const comment = "Comment is here";
//     // sudo
//     // 1. Generate RequestList-ID
//     // ref : https://grepper.tistory.com/65
//     const requestId = dayjs().format('YYYYMMDDHHmmssSSS');
//     const fileName = `${requestId}.json`;
//     console.log(requestId);
//
//     // 1-1. Make File Content(JSON)
//     let content = {};
//     content['id'] = requestId;
//     content['fileName'] = fileName;
//     content['words'] = keyword;
//     content['targetUrl'] = url;
//     content['modifiedUrl'] = '';
//     content['currency'] = '$';
//     content['minPrice'] = minPrice;
//     content['maxPrice'] = maxPrice;
//     content['pageCount'] = pageLimit;
//     content['ItemIdFlag'] = Boolean(false);   // ITEM ID 획득
//     content['ItemInfoFlag'] = Boolean(false); // ITEM INFO 획득
//     content['targetIdCount'] = 0;
//     content['comment'] = comment;
//
//
//     // 2. Create File
//     // 3. Write request info
//     const filePath = `C:/Users/tspsc/AppData/Roaming/Asell/CollectionRequest`;
//     console.log(`${filePath}/${fileName}`);
//
//     WriteFile(filePath, fileName, JSON.stringify(content));
//
//     // 4. Get target item list
//     const itemList = GetProductIDList(url, keyword, minPrice, maxPrice, pageLimit).then((res)=>{
//         // console.log(res);
//         content['targetIdCount'] = res.length;
//         content['targetItemIdList'] = res;
//         // **. flag on done
//         content['ItemIdFlag'] = Boolean(true);
//         // 5. Append item List into the file
//         WriteFile(filePath, fileName, JSON.stringify(content));
//     });
//
//     // 6. Create item data folder
//     const dataDirectory = 'C:/Users/tspsc/AppData/Roaming/Asell//ItemData';
//     CreateDirectory(`${dataDirectory}/${requestId}`);
//
//     // 7. Start scrap item data.
//     // 8. Write file in data folder
//     // **. flag on done
// }
//
// test_gatherItemInfo();