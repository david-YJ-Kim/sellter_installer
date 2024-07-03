const scrape = require('aliexpress-product-scraper');


// 1005001499907764
const product = scrape(process.argv[2]);
console.log(process.argv[2])
product.then(res => {
    console.log(res);
    return res;
});

function doScrap(productID){
    console.log("productID " + productID);
    const product = scrape(productID);
    product.then(res => {
        
        return res;
    });

}

