// puppeteer을 가져온다.
const puppeteer = require('puppeteer');
// cheerio를 가져온다.
const cheerio = require('cheerio');

// const url = 'https://www.aliexpress.com/af/category/200118011.html?trafficChannel=af&catName=women-sets&CatId=200118011&ltype=affiliate&SortType=total_tranpro_desc&minPrice=10&page=1&groupsort=1&isrefine=y'

async function PageDownWithInterval(page, intervalMS) {

    let lastHeight = await page.evaluate("document.body.scrollHeight");

    while (true) {
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
        await page.waitForTimeout(intervalMS); // sleep a bit
        let newHeight = await page.evaluate("document.body.scrollHeight");
        if (newHeight === lastHeight) {
            break;
        }
        lastHeight = newHeight;
    }
}

async function ScrollUpIntervalFromBottom(page, intervalPixel, intervalMS){

    // Go to Bottom
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight);")
    await page.waitForTimeout(intervalMS); // sleep a bit

    // Get Scroll height
    let last_height = await page.evaluate("document.body.scrollHeight");
    console.log(last_height);

    while (true) {
        await page.evaluate(`window.scrollTo(${last_height}, ${last_height-intervalPixel});`)

        last_height = last_height - intervalPixel

        await page.waitForTimeout(intervalMS); // sleep a bit

        // 스크롤 다운 후 스크롤 높이 다시 가져옴
        if (0 >= last_height){
            console.log(last_height);
            break;
        }
    }

}

const GetProductIDList = async (url, keyword, minPrice, maxPrice, pageCount) => {

    console.log("GetProductIDList");
    console.log(url, keyword, minPrice, maxPrice, pageCount);

    // 브라우저를 실행한다.
    // 옵션으로 headless모드를 끌 수 있다.
    const browser = await puppeteer.launch({
        headless: true
    });
    
    // 새로운 페이지를 연다.
    const page = await browser.newPage();
    // 페이지의 크기를 설정한다.
    await page.setViewport({
        width: 1366,
        height: 1500
    });
    const _url = 'https://ko.aliexpress.com/af/category/100003070.html?trafficChannel=af&catName=men-clothing&CatId=100003070&ltype=affiliate&SortType=total_tranpro_desc&groupsort=1&isrefine=y&page=1'
    await page.goto(_url);

    // let lastHeight = await page.evaluate("document.body.scrollHeight");
    //
    // while (true) {
    //   await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
    //   await page.waitForTimeout(5000); // sleep a bit
    //   let newHeight = await page.evaluate("document.body.scrollHeight");
    //   if (newHeight === lastHeight) {
    //     break;
    //   }
    //   lastHeight = newHeight;
    // }

    await ScrollUpIntervalFromBottom(page, 500, 1000);

    await page.waitForSelector("div.list-pagination");

    const elementHandles = await page.$$('div.JIIxO > a');
    const propertyJsHandles = await Promise.all(
      elementHandles.map(handle => handle.getProperty('href'))
    );
    const hrefs2 = await Promise.all(
      propertyJsHandles.map(handle => handle.jsonValue())
    );

    const returnList = [];
    let cnt=0;
    for(let i=0; i<hrefs2.length; i++){
        if(hrefs2[i].includes("aliexpress.com/item/")){
            const _id = hrefs2[i].split("aliexpress.com/item/")[1].split(".html?")[0];
            // console.log(_id);
            returnList.push(_id);
            cnt++;
        }
    }

    // 브라우저를 종료한다.
    await browser.close();

    // console.log(cnt);
    return returnList;

    // // 페이지의 HTML을 가져온다.
    // const content = await page.content();
    // // $에 cheerio를 로드한다.
    // const $ = cheerio.load(content);


    // const lists = $("div.JIIxO > a");

    // console.log(lists);


    // // 모든 리스트를 순환한다.
    // lists.each((index, list) => {
    //     // 각 리스트의 하위 노드중 호텔 이름에 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
    //     const name = $(list).find("a > div > div.name > strong").text();
    //     // 인덱스와 함께 로그를 찍는다.
    //     console.log({
    //     index, name
    //     });
    // });


}
// GetProductIDList();
module.exports = { GetProductIDList };