'use strict';
require('dotenv').config();
var keys = require('./keys')

module.exports = {
    chainId: process.env.CHAIN_ID, // 32 byte (64 char) hex string
    keyProvider: keys.rsn_pk, // WIF string or array of keys..
    httpEndpoint: process.env.NODE_URL,
    expireInSeconds: 60,
    broadcast: false,
    authorization: process.env.AUTHORIZED_BY + '@active',
    debug: true, // API activity
    sign: true,
    creatorAccountName: process.env.CREATOR_NAME
}