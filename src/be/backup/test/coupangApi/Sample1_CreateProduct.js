const https = require('https');
const crypto = require('crypto');
const {ACCESS_KEY, SECRET_KEY, STORE_CODE, WING_ID, CHINA_DISPATCH_CODE, RETURN_PLACE_CODE, ICN_DISPATCH_CODE} = require("./CoupangCode");

const datetime = new Date().toISOString().substr(2,17).replace(/:/gi, '').replace(/-/gi, '') + 'Z';
const method ='POST';
const path ='/v2/providers/seller_api/apis/api/v1/marketplace/seller-products';
const query = '';

const message = datetime + method + path + query;
const urlpath = path + '?' + query;

const algorithm = 'sha256';

const signature = crypto.createHmac(algorithm, SECRET_KEY)
    .update(message)
    .digest('hex');

const authorization = 'CEA algorithm=HmacSHA256, access-key=' + ACCESS_KEY + ', signed-date=' + datetime + ', signature=' + signature;
console.log(authorization);

const strjson = JSON.stringify(
    {
        "displayCategoryCode": 56137,
        "sellerProductName": "상품등록_example",
        "vendorId": STORE_CODE,
        "saleStartedAt": "2020-05-01T00:00:00",
        "saleEndedAt": "2099-01-01T23:59:59",
        "displayProductName": "해피바스 솝베리 클렌징 오일",
        "brand": "해피바스",
        "generalProductName": "솝베리 클렌징 오일",
        "productGroup": "클렌징 오일",
        "deliveryMethod": "SEQUENCIAL",
        "deliveryCompanyCode": "KGB",
        "deliveryChargeType": "FREE",
        "deliveryCharge": 0,
        "freeShipOverAmount": 0,
        "deliveryChargeOnReturn": 2500,
        "remoteAreaDeliverable": "N",
        "unionDeliveryType": "UNION_DELIVERY",
        "returnCenterCode": RETURN_PLACE_CODE,
        "returnChargeName": "반품지_1",
        "companyContactNumber": "02-1234-678",
        "returnZipCode": "135-090",
        "returnAddress": "서울특별시 강남구 삼성동",
        "returnAddressDetail": "333",
        "returnCharge": 2500,
        "outboundShippingPlaceCode": ICN_DISPATCH_CODE,
        "vendorUserId": WING_ID,
        "requested": false,
        "items": [
            {
                "itemName": "200ml_1개",
                "originalPrice": 13000,
                "salePrice": 10000,
                "maximumBuyCount": "100",
                "maximumBuyForPerson": "0",
                "outboundShippingTimeDay": "1",
                "maximumBuyForPersonPeriod": "1",
                "unitCount": 1,
                "adultOnly": "EVERYONE",
                "taxType": "TAX",
                "parallelImported": "NOT_PARALLEL_IMPORTED",
                "overseasPurchased": "NOT_OVERSEAS_PURCHASED",
                "pccNeeded": "false",
                "externalVendorSku": "0001",
                "barcode": "",
                "emptyBarcode": true,
                "emptyBarcodeReason": "상품확인불가_바코드없음사유",
                "modelNo": "1717171",
                "extraProperties": null,
                "certifications": [
                    {
                        "certificationType": "NOT_REQUIRED",
                        "certificationCode": ""
                    }
                ],
                "searchTags": [
                    "검색어1",
                    "검색어2"
                ],
                "images": [
                    {
                        "imageOrder": 0,
                        "imageType": "REPRESENTATION",
                        "vendorPath": "http://image11.coupangcdn.com/image/product/image/vendoritem/2018/06/25/3719529368/27a6b898-ff3b-4a27-b1e4-330a90c25e9c.jpg"
                    },
                    {
                        "imageOrder": 1,
                        "imageType": "DETAIL",
                        "vendorPath": "http://image11.coupangcdn.com/image/product/image/vendoritem/2018/06/25/3719529368/27a6b898-ff3b-4a27-b1e4-330a90c25e9c.jpg"
                    },
                    {
                        "imageOrder": 2,
                        "imageType": "DETAIL",
                        "vendorPath": "http://image11.coupangcdn.com/image/product/image/vendoritem/2018/06/25/3719529368/27a6b898-ff3b-4a27-b1e4-330a90c25e9c.jpg"
                    }
                ],
                "notices": [
                    {
                        "noticeCategoryName": "화장품",
                        "noticeCategoryDetailName": "용량(중량)",
                        "content": "상세페이지 참조"
                    },
                    {
                        "noticeCategoryName": "화장품",
                        "noticeCategoryDetailName": "제품 주요 사양",
                        "content": "상세페이지 참조"
                    },
                    {
                        "noticeCategoryName": "화장품",
                        "noticeCategoryDetailName": "사용기한 또는 개봉 후 사용기간",
                        "content": "상세페이지 참조"
                    },
                    {
                        "noticeCategoryName": "화장품",
                        "noticeCategoryDetailName": "사용방법",
                        "content": "상세페이지 참조"
                    },
                    // {
                    //     "noticeCategoryName": "화장품",
                    //     "noticeCategoryDetailName": "제조업자 및 제조판매업자",
                    //     "content": "상세페이지 참조"
                    // },
                    {
                        "noticeCategoryName": "화장품",
                        "noticeCategoryDetailName": "제조국",
                        "content": "상세페이지 참조"
                    },
                    {
                        "noticeCategoryName": "화장품",
                        "noticeCategoryDetailName": "화장품법에 따라 기재, 표시하여야 하는 모든 성분",
                        "content": "상세페이지 참조"
                    },
                    // {
                    //     "noticeCategoryName": "화장품",
                    //     "noticeCategoryDetailName": "식품의약품안전처 심사 필 유무",
                    //     "content": "상세페이지 참조"
                    // },
                    {
                        "noticeCategoryName": "화장품",
                        "noticeCategoryDetailName": "사용할 때 주의사항",
                        "content": "상세페이지 참조"
                    },
                    {
                        "noticeCategoryName": "화장품",
                        "noticeCategoryDetailName": "품질보증기준",
                        "content": "제품 이상 시 공정거래위원회 고시 소비자분쟁해결기준에 의거 보상합니다."
                    },
                    {
                        "noticeCategoryName": "화장품",
                        "noticeCategoryDetailName": "소비자상담관련 전화번호",
                        "content": "상세페이지 참조"
                    }
                ],
                "attributes": [
                    {
                        "attributeTypeName": "수량",
                        "attributeValueName": "1개"
                    }
                ],
                "contents": [
                    {
                        "contentsType": "TEXT",
                        "contentDetails": [
                            {
                                "content": "http://image11.coupangcdn.com/image/product/image/vendoritem/2018/06/25/3719529368/27a6b898-ff3b-4a27-b1e4-330a90c25e9c.jpg",
                                "detailType": "TEXT"
                            }
                        ]
                    }
                ],
                "offerCondition": "NEW",
                "offerDescription": ""
            }
        ],
        "requiredDocuments": [
            {
                "templateName": "기타인증서류",
                "vendorDocumentPath": "http://image11.coupangcdn.com/image/product/content/vendorItem/2018/07/02/41579010/eebc0c30-8f35-4a51-8ffd-808953414dc1.jpg"
            }
        ],
        "extraInfoMessage": "",
        "manufacture": "아모레퍼시픽"
    }, null, 2);

//console.log(strjson);

const options = {
    hostname: 'api-gateway.coupang.com',
    port: 443,
    path: urlpath,
    method: method,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Content-Length': Buffer.byteLength(strjson, 'utf8'),
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

req.write(strjson);
req.end();