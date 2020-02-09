require('dotenv').config()

module.exports = {
    URL: process.env.DB_URI || "mongodb://localhost:27017/airdrop-token-exchange",
    PORT: process.env.PORT || 8001
}