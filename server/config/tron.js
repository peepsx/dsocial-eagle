require('dotenv').config();
module.exports = {
    TRON_FULL_SOLIDITY_EVENT_NODE: process.env.TRON_FULL_SOLIDITY_EVENT_NODE,
    TRON_PRT_KEY: process.env.TRON_PRT_KEY,
    TRON_CONTRACT_ADD: process.env.TRON_CONTRACT_ADD,
    TRANSACTION_URL: process.env.TRANSACTION_URL
}