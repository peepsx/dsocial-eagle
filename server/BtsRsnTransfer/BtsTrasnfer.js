/**BTS-TRANSFER */
let { PRIVATE_KEY, BTS_MAIN_NET, BTS_TEST_NET, BTS_TESTNET_PRIVATE_KEY } = require('../config');
let {Apis} =  require('bitsharesjs-ws');
let { ChainStore, FetchChain, PrivateKey, TransactionBuilder, Aes, TransactionHelper  } = require('bitsharesjs');

module.exports = {
    BTS_TEST_TRANSFER: async (user, amount) => {

        return new Promise((resolve, reject) => {

            var privKey = BTS_TESTNET_PRIVATE_KEY; 
            let pKey = PrivateKey.fromWif(privKey);
        try{
            Apis.instance(BTS_TEST_NET, true)
            .init_promise.then((data) => {
                console.log("connected to:", data[0].network_name, "network");
        
                ChainStore.init().then(() => {
        
                    let fromAccount = "shubham9";
                    let memoSender = user;
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
                            // console.log("got data:", data);
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
                                    .then(response => {
                                        resolve({
                                            status: 200,
                                            success: true,
                                            data: response,
                                        });
                                        return;
                                    })
                                    .catch(e => {
                                        console.log("WHILE BROADCAST SERVER", e.message);
                                        reject({
                                            status: 401,
                                            success: false,
                                            message: 'BTS TRANSFER ERROR'
                                        })
                                    });
                            })
                        });
                    })
                    .catch(e => {
                        console.log('CHAIN STORE ERROR', e.message);
                        reject({
                            status: 401,
                            success: false,
                            message: 'CHAIN API INITIALED ERROR'
                        });
                        return;
                    })
                });
        
            } catch(err) {
                console.log("ERROR WHILE TRANSFER", err.message)
                reject({
                    status: 500,
                    success: false,
                    message: 'SERVER ERROR'
                });
                return;
            }
        })
    },
    BTS_MAIN_NET_TRANSFER: async (user, amount) => {
        return new Promise((resolve, reject) => {

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
        
                    let toAccount = user; /**arisen-reserve */
        
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
                            FetchChain('fetchRecentHistory', user_account)
                        ]).then((data)=> {
                            // console.log("got data:", data);
                            let [fromAccount, toAccount, memoSender, sendAsset, feeAsset, user_account] = data;
                            console.log('HISTORY', user_account);
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
                                    .then(response => {
                                        resolve({
                                            status: 200,
                                            success: true,
                                            data: response
                                        });
                                        return;
                                    })
                                    .catch(e => {
                                        console.log("WHILE BRODCAST SERVER", e.message);
                                        reject({
                                            status: 401,
                                            success: false,
                                            message: 'BTS TRANSFER ERROR'
                                        });
                                        return;
                                    });
                            })
                        });
                    })
                    .catch(e => {
                        console.log('CHAIN STORE ERROR', e.message);
                        reject({
                            status: 401,
                            success: false,
                            message: 'API INITIALIZATION ERROR'
                        });
                        return;
                    })
                });
        
            } catch(err) {
                console.log("ERROR WHILE TRANSFER", err.message)
                reject({
                    status: 500,
                    success: false,
                    message: 'SERVER ERROR'
                });
                return;
            }
        })
    }
}