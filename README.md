# Nodejs-Telebirr-API

#Install Guide

Quick start
The precondition
Apply to Ethiopia Telecom for AppID, AppKey, PublicKey.

steps:
    1. Generate StringA according to the rules in Section 1.7.1 of the Interface Document.
    <br>
    2. Perform SHA-256 on stringA to get stringB.
    3. Capitalize all the letters in StringB and get the final signature "sign".
    4. Convert all parameters into JSON strings to obtain the character string ussdjson.
    5. Perform RSA2048 encryption on ussdjson to obtain the “ussd” parameter with public key.
    6. Assemble the final request message, for example  {"appid":"xxxxxxxx","sign":"Signature string","ussd":"Encryption string"}
    7.The result message sent by the app is encrypted. The customer needs to decrypt the data first and obtain the following JSON format


{
"code":0,     "msg":"success",     "data":{        "outTradeNo":"T0533111222S001114129",        "tradeNo":"R334E456TF65H7"
}}


    7. Request http://196.188.120.3:11443/service-openup/toTradeWebPay with “post” method.
    
    
Pay more attention
    1. “timestamp” fomat:1624546517701
    2. “nonce“ Unique random string.Generated by merchant.Each request can only be used once,change new one to next request
    3. It is “outTradeNo”,not “TradeNo”, Each request can only be used once, change new one to next request
