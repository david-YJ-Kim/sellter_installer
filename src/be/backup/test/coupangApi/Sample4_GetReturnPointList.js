const https = require('https');
const crypto = require('crypto');
const {ACCESS_KEY, SECRET_KEY, WING_ID, STORE_CODE} = require("./CoupangCode");

const datetime = new Date().toISOString().substr(2,17).replace(/:/gi, '').replace(/-/gi, '') + "Z";
const method ='GET';
const path =`/v2/providers/openapi/apis/api/v4/vendors/${STORE_CODE}/returnShippingCenters`;
const query = 'pageNum=1&pageSize=50';

const message = datetime + method + path + query;
const urlpath = path + '?' + query;

const algorithm = 'sha256';

const signature = crypto.createHmac(algorithm, SECRET_KEY)
    .update(message)
    .digest('hex');

const authorization = 'CEA algorithm=HmacSHA256, access-key=' + ACCESS_KEY + ', signed-date=' + datetime + ', signature=' + signature;
console.log(authorization);

const options = {
    hostname: 'api-gateway.coupang.com',
    port: 443,
    path: urlpath,
    method: method,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': authorization,
        'X-EXTENDED-TIMEOUT':90000
    }
};

let body = [];

const req = https.request(options, res  => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(`reason: ${res.statusMessage}`);

    res.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        const json = JSON.parse(body);
        console.log(JSON.stringify(json, null, 2));
    });
});

req.on('error', error => {
    console.error(error);
});

req.end();