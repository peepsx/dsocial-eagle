/**TEST NET WORK START */
let express = require('express');
let router = express.Router();
let { PRIVATE_KEY, BTS_MAIN_NET, BTS_TEST_NET, BTS_TESTNET_PRIVATE_KEY } = require('../config/config');
let {Apis} =  require('bitsharesjs-ws');
let { ChainStore, FetchChain, PrivateKey, TransactionBuilder, Aes, TransactionHelper,  } = require('bitsharesjs');

router.post("/api/test-net/transfer", async (req, res) => {
    let { user_account } =  req.body;

    if(!user_account) return res.status(400).send({success: false, message: 'Fields is missing'});

    var privKey = BTS_TESTNET_PRIVATE_KEY; 
    let pKey = PrivateKey.fromWif(privKey);
try{
    Apis.instance(BTS_TEST_NET, true)
    .init_promise.then((data) => {
        console.log("connected to:", data[0].network_name, "network");

        ChainStore.init().then(() => {

            let fromAccount = "shubham9";
            let memoSender = fromAccount;
            let memo = "Sending tokens From Test net";

            let toAccount = user_account; /**arisen-reserve */

            let sendAmount = {
                amount: 5.00000,
                asset: "RSN"
            }

            Promise.all([
                    FetchChain("getAccount", fromAccount),
                    FetchChain("getAccount", toAccount),
                    FetchChain("getAccount", memoSender),
                    FetchChain("getAsset", sendAmount.asset),
                    FetchChain("getAsset", sendAmount.asset)
                ]).then((data)=> {
                    // console.log("got data:", res);
                    let [fromAccount, toAccount, memoSender, sendAsset, feeAsset] = data;
                    // Memos are optional, but if you have one you need to encrypt it here
                    let memoFromKey = memoSender.getIn(["options","memo_key"]);
                    let memoToKey = toAccount.getIn(["options","memo_key"]);
                    let nonce = TransactionHelper.unique_nonce_uint64();
                    let memo_object = {
                        from: memoFromKey,
                        to: memoToKey,
                        nonce,
                        message: Aes.encrypt_with_checksum(
                            pKey,
                            memoToKey,
                            nonce,
                            memo
                        )
                    }
                    let tr = new TransactionBuilder();
                    tr.add_type_operation("transfer", {
                        fee: {
                            amount: 9271200,
                            asset_id: feeAsset.get("id")
                        },
                        from: fromAccount.get("id"),
                        to: toAccount.get("id"),
                        amount: { amount: sendAmount.amount, asset_id: sendAsset.get("id") },
                        memo: memo_object
                    })

                    tr.set_required_fees().then(() => {
                        tr.add_signer(pKey, pKey.toPublicKey().toPublicKeyString());
                        tr.broadcast()
                            .then(resopnse => {
                                res.status(200).send(response)
                            })
                            .catch(e => {
                                console.log("WHILE BRODCAST SERVER", e.message);
                                res.status(401).send({success: false, msg: 'Something went Wrong'})
                            });
                    })
                });
            })
            .catch(e => {
                console.log('CHAIN STORE ERROR', e.message);
            })
        });

    } catch(err) {
        console.log("ERROR WHILE TRANSFER", err.message)
        res.status(500).send({
            success: false,
            msg: 'Server Error'
        })
    }
});

router.post("/api/main-net/transfer", async (req, res) => {
    let { user_account, amount } =  req.body;

    if(!user_account || !amount) return res.status(401).send({success: false, message: 'Field is missing'});

    var privKey = PRIVATE_KEY; 
    let pKey = PrivateKey.fromWif(privKey);
try{
    Apis.instance(BTS_MAIN_NET, true)
    .init_promise.then((data) => {
        console.log("connected to:", data[0].network_name, "network");

        ChainStore.init().then(() => {
            
            let fromAccount = "arisen-out";
            let memoSender = fromAccount;
            let memo = "RSN Token transfer from Main net";

            let toAccount = user_account; /**arisen-reserve */

            let sendAmount = {
                amount: amount,
                asset: "RSN"
            }

            Promise.all([
                    FetchChain("getAccount", fromAccount),
                    FetchChain("getAccount", toAccount),
                    FetchChain("getAccount", memoSender),
                    FetchChain("getAsset", sendAmount.asset),
                    FetchChain("getAsset", sendAmount.asset),
                ]).then((data)=> {
                    console.log("got data:", res);
                    let [fromAccount, toAccount, memoSender, sendAsset, feeAsset] = data;
                    // Memos are optional, but if you have one you need to encrypt it here
                    let memoFromKey = memoSender.getIn(["options","memo_key"]);
                    let memoToKey = toAccount.getIn(["options","memo_key"]);
                    let nonce = TransactionHelper.unique_nonce_uint64();
                    let memo_object = {
                        from: memoFromKey,
                        to: memoToKey,
                        nonce,
                        message: Aes.encrypt_with_checksum(
                            pKey,
                            memoToKey,
                            nonce,
                            memo
                        )
                    }
                    let tr = new TransactionBuilder();
                    tr.add_type_operation("transfer", {
                        fee: {
                            amount: 9271200,
                            asset_id: feeAsset.get("id")
                        },
                        from: fromAccount.get("id"),
                        to: toAccount.get("id"),
                        amount: { amount: sendAmount.amount, asset_id: sendAsset.get("id") },
                        memo: memo_object
                    })

                    tr.set_required_fees().then(() => {
                        tr.add_signer(pKey, pKey.toPublicKey().toPublicKeyString());
                        tr.broadcast()
                            .then(resopnse => {
                                res.status(200).send(resopnse)
                            })
                            .catch(e => {
                                console.log("WHILE BRODCAST SERVER", e.message);
                                res.status(401).send({success: false, msg: 'Something went Wrong'})
                            });
                    })
                });
            })
            .catch(e => {
                console.log('CHAIN STORE ERROR', e.message);
            })
        });

    } catch(err) {
        console.log("ERROR WHILE TRANSFER", err.message)
        res.status(500).send({
            success: false,
            msg: 'Server Error'
        })
    }

});

module.exports = router;