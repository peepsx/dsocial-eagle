let express = require('express');
let router = express.Router();
const BitShares = require('btsdex')
const BigNumber = require('bignumber.js');
let { Arisen_Transfer } = require('../models/Arisen-blockchain-transfer');
let { httpEndpoint, chainId, keyProvider} = require('../config/arisen');
let config = require('../config');
let { Apis } = require('bitsharesjs-ws');
let RSN = require('arisenjsv1');
let rsn = RSN({httpEndpoint, chainId, keyProvider});
  

router.post('/transfer', async (req, res) => {
    let { 
        user,
        send,
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
/**BTS USERNAME VALIDATION CHECK */
            let valid_arisen = await rsn.getAccount(sender_username);
            if(!valid_arisen) return res.status(404).json({
                success: false,
                message: 'Arisen username not found'
            })
            Apis.instance(config.BTS_MAIN_NET, true).init_promise.then(async (data) => {
                console.log("connected to:", data[0].network);
            let validUser = await Apis.instance().db_api().exec('get_account_by_name', [receiver_username]);

              if(validUser.name !== receiver_username) return res.status(404).send({success: false, message: 'Invalid user'});
            });

/** TRANSFER FOR BitShare NETWORK  */          
            let balance = await rsn.getAccount(user);
            if(balance.core_liquid_balance === amount) {
                await BitShares.connect("wss://api.btsgo.net/ws")
                let acc = new BitShares('arisen-out', config.PRIVATE_KEY);
                let tx = acc.newTx()
                let operation = await acc.transferOperation("arisen-reserve", "RSN", balance.core_liquid_balance);
                    tx.add(operation)
                let cost = await tx.cost()
                console.log(cost) // { BTS: 1.234 }
                let transaction = await acc.broadcast(tx)
                let rsn_transfered = new Arisen_Transfer({
                    amount: amount,
                    account_from_transfer: process.env.TRANSFER_USER,
                    transaction_id: transfer.transaction_id,
                    transfer_to_user: sender_username,
                    send: send,
                    receive: receive || undefined
                })
                  await rsn_transfered.save();
                  
                        res.status(200).json(transaction);

                } else {
                    res.status(200).json({
                        success: false,
                        message: 'Please complete your transaction'
                    });
                }
        } else if(send === 'BitShare') {
/** ARISEN USER VALIDATION */
            let valid_arisen = await rsn.getAccount(receiver_username);
            if(!valid_arisen) return res.status(404).json({
                success: false,
                message: 'Arisen username not found'
            })
/** BTS USERNAME VALIDATION */
            Apis.instance(config.BTS_MAIN_NET, true).init_promise.then(async (data) => {    
                console.log("connected to:", data[0].network);
                let validUser = await Apis.instance().db_api().exec('get_account_by_name', [sender_username]);
                 if(validUser.name !== sender_username) return res.status(404).send({success: false, message: 'Invalid username'});
                 var balance = await Apis.instance().history_api().exec('get_account_history',
                            ['1.2.1704126', '1.11.0', 10, '1.11.0']);
                            console.log('BALANCE', balance[0].op[1].to, balance[0].op[1].amount.amount);
                    if(balance[0].op[1].to === '1.2.1704126' && balance[0].op[1].amount.amount === BigNumber(amount).multipliedBy(100000)) {
                        rsn.transfer(process.env.TRANSFER_USER, sender_username, amount, '', config)
                        .then(async (transfer) => {
                            let rsn_transfered = new Arisen_Transfer({
                                amount: amount,
                                account_from_transfer: process.env.TRANSFER_USER,
                                transaction_id: transfer.transaction_id,
                                transfer_to_user: sender_username,
                                send: send,
                                receive: receive || undefined
                            })
                              await rsn_transfered.save();
                                return res.status(200).send({
                                  success: true,
                                  message: `${amount} has been sent to the user ${sender_username} account successfully!`,
                                  transaction_id: transfer.transaction_id
                                })
                        })
                        .catch(e => {
                            console.log(e)
                            return res.status(500).send({
                                success: false,
                                message: 'Server Error'
                            })
                        })
                    } else {
                        res.status(200).json({
                            success: false,
                            message: 'Please complete your transfer'
                        });
                    }
                });
/** TRANSFER FOR ARISEN NETWORK */
        } else {
            console.log('SENDER NOT VALID')
            return res.status(401).send({
                success: false,
                message: `${sender_username} not a valid sender type`
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