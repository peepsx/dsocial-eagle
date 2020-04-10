let config = require('../config');
let { EOS_URL, PRIVATE_KEY, EOS_ACCOUNT_FOR_TRANSFERS } = require('../config/eos'); //EOS config
let tronConfig = require('../config/tron'); //TRON config
let etherConfig = require('../config/ether'); //TRON config
let express = require('express');
let router = express.Router();
const BitShares = require('btsdex')
const BigNumber = require('bignumber.js');
const { Api, JsonRpc, RpcError, } = require('eosjs');
const { JsSignatureProvider } = require('../node_modules/eosjs/dist/eosjs-jssig');
const fetch = require('node-fetch');
const { TextDecoder, TextEncoder } = require('util');
const signatureProvider = new JsSignatureProvider([PRIVATE_KEY]);
const rpc = new JsonRpc(EOS_URL, {fetch});
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
let { Arisen_Transfer } = require('../models/Arisen-blockchain-transfer');
let { httpEndpoint, chainId, keyProvider} = require('../config/arisen');
let { Apis } = require('bitsharesjs-ws');
let RSN = require('arisenjsv1');
let rsn = RSN({httpEndpoint, chainId, keyProvider});
let tronWeb = require('tronweb');
let HttpProvider = tronWeb.providers.HttpProvider;
let fullNode = new HttpProvider(tronConfig.TRON_FULL_SOLIDITY_EVENT_NODE);
let { Tron } = require('../models/Tron');
let { Ether } = require('../models/Ethereum');
let axios = require('axios');
let web3 = require('../web3');

const newTron = new tronWeb(
    fullNode,
    fullNode,
    tronConfig.TRON_FULL_SOLIDITY_EVENT_NODE,
    tronConfig.TRON_PRT_KEY            
);

router.post('/transfer', async (req, res) => {
    let { 
        user,
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
        if(send === 'Arisen' && receive === 'BitShare') {
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
                    type: 'ARISEN TO BIT SHARE'
                })
                  await rsn_transfered.save();
                  
                        res.status(200).json(transaction);

                } else {
                    res.status(200).json({
                        success: false,
                        message: 'Please complete your transaction'
                    });
                }
        } else if(send === 'BitShare' && receive === 'Arisen') {
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
                                type: "BIT SHARE TO ARISEN"
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
        } 
        else if (send === 'Arisen' && receive === 'EOS') {
            let valid_arisen = await rsn.getAccount(sender_username);
                if(!valid_arisen) return res.status(404).json({
                    success: false,
                    message: 'Arisen username not found'
                })
            const eosAccount = await rpc.get_account(receiver_username); // for now rahulsharma2
                if(!eosAccount)
                    return res.status(400).send({success: false, message: 'Eos account not valid'});
            let balance = await rsn.getAccount(user);
                if(balance.core_liquid_balance === amount) {
                        const trx = await api.transact({
                                actions: [{
                                account: EOS_ACCOUNT_FOR_TRANSFERS,
                                name: 'transfer',
                                authorization: [{
                                    actor: EOS_ACCOUNT_FOR_TRANSFERS,
                                    permission: 'active',
                                }],
                                data: {
                                    from: EOS_ACCOUNT_FOR_TRANSFERS,
                                    to: receiver_username,
                                    quantity: amount,
                                    memo: '',
                                },
                                }]
                            }, {
                                blocksBehind: 3,
                                expireSeconds: 30,
                            });
                        if(trx) {
                            let rsn_transfered = new Arisen_Transfer({
                                amount: amount,
                                account_from_transfer: EOS_ACCOUNT_FOR_TRANSFERS,
                                transaction_id: trx.transaction_id,
                                transfer_to_user: sender_username,
                                type: 'ARISEN TO EOS'
                            })
                            await rsn_transfered.save();
                            return res.status(200).send({
                                success: true,
                                data: trx
                            });
                        } else {
                            return res.send(401).send({
                                success: false,
                                messages: 'Transaction not successfully done'
                            })
                        }
                } else {
                    return res.status(200).send({
                        success: false,
                        message: 'Please complete your transaction first'
                    })
                }
        } else if (send === 'EOS' && receive === 'Arisen') {
            console.log('EOS TO ARISEN')
            
        } else if (send === 'Arisen' && receive === 'Tron') {
            console.log('ARISEN TO TRON')
            let { address } = req.body;
            if(!address)
                return res.status(401).send({success: false, message: 'Tron address is missing' });
                
            let valid_arisen = await rsn.getAccount(sender_username);
            if(!valid_arisen) return res.status(404).json({
                success: false,
                message: 'Arisen username not found'
            })
            let contract = await newTron.contract().at(tronConfig.TRON_CONTRACT_ADD);
            let tronAddress = await contract.balanceOf(address).call();
            if(!tronAddress)
                return res.status(404).send({success: false, message: 'Tron address is not found'})
            
            let balance = await rsn.getAccount(user);
            if(balance.core_liquid_balance === amount) {
                    await contract.transfer(address, amount).send({})
                                        .then(async output => {
                                            let TronTrx = new Tron({
                                                type: "ARISEN TO TRON",
                                                tron_address: address,
                                                trx_id: output,
                                                arisen_user: sender_username,
                                                arisen_new_user: user,
                                                transfer_amount: amount
                                            })
                                            await TronTrx.save();

                                        })
                                        .catch(e => res.status(500).send({success: false, message: 'Server Error'}))
            } else {
              return res.status(200).json({
                    success: false,
                    message: 'Please complete your transfer'
                });
            }
        } else if (send === 'Tron' && receive === 'Arisen') {
            console.log('Tron TO Arisen')
            let { address } = req.body;
            if(!address)
                return res.status(401).send({success: false, message: 'Tron address is missing' });
                
            let valid_arisen = await rsn.getAccount(receiver_username);
            if(!valid_arisen) return res.status(404).json({
                success: false,
                message: 'Arisen username not found'
            })
            let contract = await newTron.contract().at(tronConfig.TRON_CONTRACT_ADD);
            let tronAddress = await contract.balanceOf(address).call();
            if(!tronAddress)
                return res.status(404).send({success: false, message: 'Tron address is not found'})

            let transaction = await axios.get(tronConfig.TRANSACTION_URL);
            
            transaction.data.data.map(async trx => {
                if(trx.to === 'TVBYMVMgA7Kc2dTX6mAmQqJHhvH35ppYbn' && trx.from === address && trx.value === amount) {
                    rsn.transfer(process.env.TRANSFER_USER, receiver_username, amount, '', config)
                        .then(async trx_id => {
                            let TronToArisen = new Tron({
                                type: "TRON TO ARISEN",
                                tron_address: address,
                                trx_id: trx_id.transaction_id,
                                arisen_user: receiver_username,
                                arisen_new_user: user || undefined,
                                transfer_amount: amount
                            })
                            await TronToArisen.save();
                            return res.status(200).send({
                                success: true,
                                data: trx_id.transaction_id,
                                message: 'Successfully transfer'
                            })
                        })
                        .catch(e => res.status(500).send({success: false, message: 'Transfer failed'}))
                } else {
                    return res.status(200).json({
                        success: false,
                        message: 'Please complete your transfer'
                    });
                }
            })

        } else if (send === 'Arisen' && receive === 'Ether') {
            console.log('Arisen TO Ether')
            let { address } = req.body;
            if(!address)
                return res.status(401).send({success: false, message: 'Tron address is missing' });
                
            let valid_arisen = await rsn.getAccount(sender_username);
            if(!valid_arisen) return res.status(404).json({
                success: false,
                message: 'Arisen username not found'
            })
            //TO DO ETHER ADDRESS VALIDATION
            let validAddress = web3.utils.isAddress(address);
            if(!validAddress)
                return res.status(200).send({success: false, message: 'Address is not valid'});
            
            let balance = await rsn.getAccount(user);
            if(balance.core_liquid_balance === amount) {
                fetch('https://ethgasstation.info/json/ethgasAPI.json')
                .then(res => res.json())
                .then(async getGas => {

                    web3.eth.getBalance(etherConfig.ETHER_ADDRESS)
                            .then(async (Balance) => {
                                let balanceEther = Bignumber(Balance).dividedBy(1e18).toString()
                                console.log("ETHER BALANCE", Bignumber(Balance).dividedBy(1e18).toString()) //BALANCE
                                /* IF BALANCE IS SUFFICIENT */
                                /** TOKEN BALANCE CHECK */
                                let data = web3.utils.sha3('balanceOf(address)').slice(0, 10) + '0'.repeat(24) + (etherConfig.ETHER_ADDRESS).substring(2);
                                let balance = await web3.eth.call({ to: etherConfig.ETHER_CONTRACT, data: data })
                                let tokenBalance = Bignumber(balance).div(1e18).toString() /**TOKEN BALANCE */
                                console.log("TOKEN AVAILABLE", tokenBalance);
                                /** TOKEN BALANCE CHECK */
                                let gasFee = Bignumber(Bignumber(getGas.safeLow).dividedBy(1e10).toString()).multipliedBy(etherConfig.gas_limit).toString() /**Gas Fee In Ether */
                                console.log("GAS FEE", gasFee)
                                if (Bignumber(balanceEther).isGreaterThanOrEqualTo(gasFee) && Bignumber(tokenBalance).isGreaterThanOrEqualTo(amount)) {
                                    //Make Data for transactions
                                    let addressToSend = '0'.repeat(24) + (address).substring(2)
                                    let userAmount = Bignumber(amount).multipliedBy(1e18).toString()
                                    let amountToHex = web3.utils.toHex(userAmount)
                                    let amountToSend = '0'.repeat(66 - amountToHex.length) + amountToHex.substring(2)
                                    let dataForTx = web3.utils.sha3('transfer(address,uint256)').slice(0, 10) + addressToSend + amountToSend;
                                    console.log(dataForTx)
                                    //Make Data for transactions
                                    var nonce = await web3.eth.getTransactionCount(etherConfig.ETHER_ADDRESS, "pending")
                                    console.log("+++++++++++++++++++++++++++++++++++++++++> nonce", nonce)
                                    web3.eth.accounts.signTransaction({
                                        from: etherConfig.ETHER_ADDRESS,
                                        to: etherConfig.ETHER_CONTRACT,
                                        value: '0',
                                        nonce: web3.utils.toHex(nonce),
                                        gas: etherConfig.gas_limit,
                                        // gasPrice: etherConfig.gas_price,
                                        data: dataForTx
                                    }, '0x' + etherConfig.ETHER_PRIVATE).then(async (signTx) => {

                                        // console.log(signTx)
                                        web3.eth.sendSignedTransaction(signTx.rawTransaction, async (err, confirm) => {
                                            if (err) {
                                                console.log("eee", err)
                                            } else {
                                                console.log("confirm txn", confirm)
                                                let newEther = await Ether({
                                                    ether_address: address,
                                                    type: 'ARISEN TO ETHER',
                                                    arisen_user: sender_username,
                                                    arisen_new_user: user,
                                                    transfer_amount: amount,
                                                    trx_id: confirm
                                                })
                                                await newEther.save();
                                                return res.status(200).send({
                                                    success: true,
                                                    message: 'Successfully Transfer'
                                                })
                                            }
                                        })
                                    })
                                    .catch(e => {
                                        console.log("ERROR WHILE MAKING SIGN Tx", e)
                                    })
                                } else {
                                    return res.status(200).json({
                                        success: false,
                                        message: 'Insufficient fund'
                                    });
                                }
                            }).catch(e => {
                                console.log("ERROR IN GET BALANCE", e)
                            })
                })
                .catch(e => {
                    console.log("ERROR IN GAS PRICE", e)
                })
            } else {
                return res.status(200).json({
                    success: false,
                    message: 'Please complete your transfer'
                });
            }
        } else if (send === 'Ether' && receive === 'Arisen') {
            console.log('Ether TO Arisen')
            let { address } = req.body;
            if(!address)
                return res.status(200).send({success: false, message: "address is missing" })
            let validAddress = web3.utils.isAddress(address);
            if(!validAddress)
                return res.status(200).send({success: false, message: 'Address is not valid'});
            
                if (endBlockNumber == null) {
                    endBlockNumber = await web3.eth.getBlockNumber();
                    console.log("Using endBlockNumber: " +  endBlockNumber);
                  }
                  if (startBlockNumber == null) {
                    startBlockNumber = endBlockNumber - 1000;
                    console.log("Using startBlockNumber: " + startBlockNumber);
                  }
                  console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
                
                  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
                    if (i % 1000 == 0) {
                      console.log("Searching block " + i);
                    }
                    var block = await web3.eth.getBlock(i, true);
                    if (block != null && block.transactions != null) {
                      block.transactions.forEach( function(e) {
                        if (address == e.from && etherConfig.ETHER_ADDRESS == e.to && e.input !== '0x') {
                          console.log("  tx hash          : " + e.hash + "\n"
                            + "   nonce           : " + e.nonce + "\n"
                            + "   blockHash       : " + e.blockHash + "\n"
                            + "   blockNumber     : " + e.blockNumber + "\n"
                            + "   transactionIndex: " + e.transactionIndex + "\n"
                            + "   from            : " + e.from + "\n" 
                            + "   to              : " + e.to + "\n"
                            + "   value           : " + e.value + "\n"
                            + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
                            + "   gasPrice        : " + e.gasPrice + "\n"
                            + "   gas             : " + e.gas + "\n"
                            + "   input           : " + e.input);
                            rsn.transfer(process.env.TRANSFER_USER, receiver_username, amount, '', config)
                            .then(async trx_id => {
                                let EtherToArisen = new Ether({
                                    type: "ETHER TO ARISEN",
                                    ether_address: address,
                                    trx_id: trx_id.transaction_id,
                                    arisen_user: receiver_username,
                                    arisen_new_user: user || undefined,
                                    transfer_amount: amount
                                })
                                await EtherToArisen.save();
                                return res.status(200).send({
                                    success: true,
                                    data: trx_id.transaction_id,
                                    message: 'Successfully transfer'
                                })
                            })
                            .catch(e => res.status(500).send({success: false, message: 'Transfer failed'}))
                        }
                      })
                    }
                  }
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