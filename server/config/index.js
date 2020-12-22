require('dotenv').config()

module.exports = {
    URL: process.env.DB_URL || "mongodb://localhost:27017/airdrop-token-exchange",
    PORT: process.env.PORT || 8001,
    BTS_MAIN_NET: process.env.BTS_MAIN_NET,
    BTS_TEST_NET: process.env.BTS_TEST_NET,
    PRIVATE_KEY: process.env.BTS_PRIVATE_KEY,
    BTS_TESTNET_PRIVATE_KEY: process.env.BTS_TESTNET_PRIVATE_KEY,
    SERVER_LESS: process.env.SERVER_LESS,
    EMAIL_KEY: process.env.SENDGRID_API_KEY,
    Account_SID: process.env.Account_SID,
    Auth_Token: process.env.Auth_Token
}