const doScrape = require('aliexpress-product-scraper');
const { ipcRenderer } = require("electron");
const { APP_GET_APPDATA} = require("../../code/IpcCommands");
const {DIR_ITEM_STORE, PATH_BASE} = require("../../code/DirectoryPath");
const {WriteFile} = require("./FileHandler");


const ScrapItemInfo = async (requestId, itemIdList) => {

    console.log(requestId, itemIdList);
    console.log((Array.isArray(itemIdList)));

    const dataFilePath = `${PATH_BASE}/${DIR_ITEM_STORE}/${requestId}`
    console.log(dataFilePath)

    // const doScrapWrite = async () =>{
    //     itemIdList&&itemIdList.map((_id) => {
    //         // console.log(`do Scrap `, _id);
    //         doScrape(_id).then(res => {
    //             WriteFile(dataFilePath, `${_id}.json`, JSON.stringify(res));
    //             console.log("ScrapItemInfo DONE SCRAPE", _id);
    //         })
    //         console.log("ScrapItemInfo END SCRAPING");
    //     })
    //     console.log("ScrapItemInfo END SCRAPING111");
    // }

    itemIdList&&itemIdList.map((_id) => {
        // console.log(`do Scrap `, _id);
        doScrape(_id).then(res => {
            WriteFile(dataFilePath, `${_id}.json`, JSON.stringify(res));
            console.log("ScrapItemInfo DONE SCRAPE", _id);
        })
    })



    // await itemIdList&&itemIdList.map((_id) =>{
    //
    //     console.log(`do Scrap `, _id);
    //
    //     doScrape(_id).then(res => {
    //         WriteFile(dataFilePath, `${_id}.json`, JSON.stringify(res));
    //         console.log("DONE SCRAPE", _id, completeCnt);
    //         completeCnt++;
    //     })
    // })
}

ScrapItemInfo().then(r => console.log(r));
module.exports = { ScrapItemInfo }