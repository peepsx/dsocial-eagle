require('dotenv').config();

module.exports = {
    ETHER_URL: process.env.ETHER_URL,
    ETHER_CONTRACT: process.env.ETHER_CONTRACT,
    ETHER_ADDRESS: process.env.ETHER_ADDRESS,
    ETHER_PRIVATE: process.env.ETHER_PRIVATE,
    gas_limit: process.env.gas_limit,
    gas_price: process.env.gas_price
}