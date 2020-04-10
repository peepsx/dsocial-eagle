require('dotenv').config();

module.exports = {
    //JUNGLE_NET
    EOS_URL: process.env.JUNGLE_NET_URL,
    PRIVATE_KEY: process.env.JUNGLE_NET_PK,
    EOS_ACCOUNT_FOR_TRANSFERS: process.env.EOS_ACCOUNT_FOR_TRANSFERS
}