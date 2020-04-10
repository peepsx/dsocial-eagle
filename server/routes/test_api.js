let express  = require('express');
let router = express.Router();
let request = require('request');
let axios = require('axios');
let tronConfig = require('../config/tron')
router.get('/test-api', async (req, res) => {
    let transaction = await axios.get(tronConfig.TRANSACTION_URL);
    transaction.data.data.map(async trx => {
        console.log(trx)
        if(trx.to === 'TUXMsSX943jB6PivRdY3VQzpksuhJKQ5wX') {
            console.log(trx.to)
            console.log('aaaaa')
        }
    })
})
router.get('/api/v1/get_code/:account', (req, res) => {
    let data =  {
    account_name: req.params.account
};
    request.post({url: "https://greatchains.arisennodes.io/v1/chain/get_abi", json: data }).pipe(res);
});

module.exports = router