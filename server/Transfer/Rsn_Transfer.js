require('dotenv').config();
let config = require('../config/arisen');
let RSN = require('arisenjsv1');
let { UserAuth } = require('../models/user');
let { Rsn_Transfer } = require('../models/transfer');
const { Api, JsonRpc, RpcError } = require('@arisencore/js');
const { JsSignatureProvider } = require('@arisencore/js/dist/rixjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');

module.exports = {
    Rsn_Transfer: async (arisen_username, id) => {
      return  new Promise(async (resolve, reject) => {
            try {
                let rsn = new RSN(config);
                if(!arisen_username || arisen_username == undefined || arisen_username ==null || !id) {
                    return reject({
                           success: false,
                            message: `Fields are missing !`
                        })
                }
                  rsn.transfer(process.env.TRANSFER_USER, arisen_username, process.env.AMOUNT, '', config)
                      .then(async (transfer) => {
                          let rsn_transfered = new Rsn_Transfer({
                              user: id,
                              amount: process.env.AMOUNT,
                              account_from_transfer: process.env.TRANSFER_USER,
                              transaction_id: transfer.transaction_id
                          })
                            await rsn_transfered.save();
                              return resolve({
                                success: true,
                                message: `${process.env.AMOUNT} has been sent to the user ${arisen_username} account successfully!`,
                                transaction_id: transfer.transaction_id
                              })
                      })
                      .catch(e => {
                          console.log(e)
                          reject(null, {
                              success: false,
                              message: 'Server Error'
                          })
                      })
            } catch (error) {
                console.log('ERROR WHILE TRANSFER', error.message);
            }
        })
    },
    RixTransfer: async (from, to, quantity, memo, private) => {
        return new Promise(async (resolve, reject) => {
            const defaultPrivateKey = private;
            const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
            const rpc = new JsonRpc('https://greatchains.arisennodes.io', { fetch });
            const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
            
                const result = await api.transact({
                    actions: [{
                      account: 'arisen.token',
                      name: 'transfer',
                      authorization: [{
                        actor: from,
                        permission: 'active',
                      }],
                      data: {
                        from: from,
                        to: to,
                        quantity: `${quantity} RIX`,
                        memo: memo || '',
                      },
                    }]
                  }, {
                    broadcast: true,
                    blocksBehind: 3,
                    expireSeconds: 30,
                  });
                  return resolve({
                      success: true,
                      result
                  })
        })
    }
}