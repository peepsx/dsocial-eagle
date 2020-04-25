let express  = require('express');
let router = express.Router();
let request = require('request');
let axios = require('axios');
let Rsn = require('arisenjsv1');
let config_rsn = require('../config/register_arisen')
let rsn = Rsn(config_rsn);

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

router.post('/api/v1/transaction-hash', async (req, res) => {
    try {
        let { hash } = req.body;

        let data = rsn.getTransaction(hash);

        res.json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: "Server error"})
    }
})
module.exports = router