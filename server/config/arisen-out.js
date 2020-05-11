'use strict';
require('dotenv').config();

module.exports = {
    chainId: process.env.CHAIN_ID, // 32 byte (64 char) hex string
    keyProvider: process.env.OUT_PK, // WIF string or array of keys..
    httpEndpoint: process.env.NODE_URL,
    expireInSeconds: 60,
    broadcast: true,
    authorization: process.env.OUT_AUTHORIZED_BY + '@active',
    debug: true, // API activity
    sign: true,
    creatorAccountName: process.env.OUT_CREATOR_NAME
}