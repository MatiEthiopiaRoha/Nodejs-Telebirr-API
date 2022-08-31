const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
const express = require('express');
const crypto = require ("crypto");
const axios = require('axios');
var router = express.Router();
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const PORT = 5000;
app.use(express.json())

app.use("*",cors());
app.options("*", cors());



var appId="ff64a3d481f240ea82e9b3b36ea2da2f";


app.post("/telebirr/",(req,res1)=>{
    
    
    const { subject} = req.body;
    const { totalAmount} = req.body;
    const { shortCode} = req.body;
    const { notifyUrl} = req.body;
    const { returnUrl} = req.body;
    const { receiveName} = req.body;
    const { timeoutExpress} = req.body;


var nonce=Math.floor(Date.now()/1000);

var timestamp=Date.now();
console.log('Telebirr');
console.log(timestamp);
console.log(nonce);
const appKey = '76aa2b8e19344591b49743078241dd19';
let signObj = {
    "appId":appId,
    "nonce":nonce,
    "notifyUrl":notifyUrl,
    "outTradeNo":nonce,
    "receiveName":receiveName,
    "returnUrl":returnUrl,
    "shortCode":shortCode,
    "subject":subject,
    "timeoutExpress":"30",
    "timestamp":nonce,
    "totalAmount":totalAmount
};
signObj.appKey = appKey;
let StringA = jsonSort(signObj);
console.log(StringA);
function jsonSort(jsonObj) {
let arr = [];
for (var key in jsonObj) {
arr.push(key);
}
arr.sort();
let str = '';
for (var i in arr) {
str += arr[i] + "=" + jsonObj[arr[i]] + "&";
}
return str.substr(0, str.length - 1);
}
let StringB = sha256(StringA);
function sha256(data) {
    var hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}
var strings = StringB;
var sign = strings.toUpperCase(StringB);
console.log(sign);
let jsonObj = {
    "appId":appId,
    "nonce":nonce,
    "notifyUrl":notifyUrl,
    "outTradeNo":nonce,
    "receiveName":receiveName,
    "returnUrl":returnUrl,
    "shortCode":shortCode,
    "subject":subject,
    "timeoutExpress":"30",
    "timestamp":nonce,
    "totalAmount":totalAmount
};
let ussdjson = JSON.stringify(jsonObj);
console.log(ussdjson);
var  publicKey  = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzSVfsyn6ZGzL0aMhl3DS5i2BS0LP73eNERLOoHet6eQtQYkya9zC3asz0COPUheHshC7//kktgM7CqIJXpOgh07zTidb6R0/8vHaVYsZ1zMXuoeMiK1V99ClitJkkwNyWlif3pWgk03Ys0x8JgKAqcGmbQcQQTFgmJVhxAZiiqG6ryWxZ7+Wn3QeZeQXFxIkl2N59lIkKa5o+9pcHUq4jV+NGly9HQPDJBPIqtWRdNy5Ki9uowx1/K2s/Gerpk9NPEADKlbd8vGBbep5dYOeAWb1+x9RhjbSYN6qlNyhyhCnckx12fYKhCLo+X0jtJGoNeFl8haHr0wo7P343ertPwIDAQAB';
const rsa_encrypt = (data) => {
    let key = new NodeRSA(getPublicKey(publicKey));
    key.setOptions({encryptionScheme: 'pkcs1'});
    let encryptKey = key.encrypt(data, 'base64');
    return encryptKey;
}
function insertStr(str, insertStr, sn) {
    var newstr = '';
    for (var i = 0; i < str.length; i += sn) {
        var tmp = str.substring(i, i + sn);
        newstr += tmp + insertStr;
    }
    return newstr;
}
const getPublicKey = function (key) {
    const result = insertStr(key, '\n', 64);
    return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
};
let ussd = rsa_encrypt(ussdjson);
let requestMessage = {appid: signObj.appId, sign: sign, ussd: ussd};
const api = 'http://196.188.120.3:11443/service-openup/toTradeWebPay';
console.log(requestMessage);

console.log(nonce);
console.log(timestamp);

    axios
            .post(api, requestMessage)
            .then(res => {
                if (res.status == 200 && res.data.code == 200) {
                    console.log(res.data.data.toPayUrl);

                    url  = res.data.data.toPayUrl;
                    res1.send(url);

                } else {
                    console.error(res.data.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
            
});



app.listen(
    PORT,
    () => console.log(`Server Started on http://localhost:${PORT}`)
)
