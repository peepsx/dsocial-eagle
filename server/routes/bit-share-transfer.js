let express = require('express');
let router = express.Router();
let { httpEndpoint, chainId, keyProvider} = require('../config/arisen');
let config = require('../config');
let { Apis } = require('bitsharesjs-ws');
let RSN = require('arisenjsv1');

router.post('/transfer', async (req, res) => {
    let { 
        send,
        receive,
        sender_username,
        receiver_username,
        amount
    } = req.body;
    
    if(!sender_username || !receiver_username || !amount || !send) return res.status(401).send({
            success: false,
            message: 'Field are missing'
    });
    
    try {
        if(send === 'Arisen') {
        
            let rsn = RSN({httpEndpoint, chainId, keyProvider});
            let valid_arisen = await rsn.getAccount(sender_username);
            console.log('HOOB TANSFER', valid_arisen);
            let valid_transaction_rsn = await rsn. 
            console.log('ARISEN')
            Apis.instance(config.BTS_MAIN_NET, true).init_promise.then(async (data) => {
                console.log("connected to:", data[0].network);
            let validUser = await Apis.instance().db_api().exec('get_account_by_name', [receiver_username]);

              if(validUser.name !== receiver_username) return res.status(404).send({success: false, message: 'Invalid user'});
            });
          
          let transaction =  setInterval(() => {
            let array = ['Ashu', 'Abhi', 'Deepak', 'Amit'];
            array.map(async val => {
                var balance = await Apis.instance().history_api().exec('get_account_history', ['1.2.1704126', '1.11.0', 10, '1.11.0']);
                
                console.log(val);
                if(val === 'Deepak') {
                    console.log('aaaaaa')
                    res.status(200).send({
                        success: true,
                        data: 'Name '+JSON.stringify(balance)
                    })
                    clearInterval(transaction);
                }
            })
              }, 1000);
        } else if(type === 'BitShare') {
            Apis.instance(config.BTS_MAIN_NET, true).init_promise.then(async (data) => {
                console.log("connected to:", data[0].network);
            let validUser = await Apis.instance().db_api().exec('get_account_by_name', [sender_username]);
              if(validUser.name !== sender_username) return res.status(404).send({success: false, message: 'Invalid user'});
            });
            // let rsn = new RSN(config);
            // let valid_arisen = await rsn.getAccount(receiver_username);
            // console.log('HOOB TANSFER', valid_arisen);
            /** CHECK FOR VALID BitShare User */
            let transaction =  setInterval(() => {
                let array = [1, 2, 3, 4];
                array.map(id => {
                    if(id === 4) {
                        console.log("Sent interval test", id)
                    }
                })
            }, 1000)
            clearInterval(transaction);
        } else {
            console.log('SENDER NOT VALID')
            return res.status(401).send({
                success: false,
                message: `${send} not a valid sender type`
            })
        }
    } catch (error) {
        console.log(error.message);
        if(error.status === 500) return res.status(500).send({
            success: false,
            message: 'Unknown key'
        })
        return res.status(500).send({
            success: false,
            message: 'Server Error'
        })
    }
})

module.exports = router;