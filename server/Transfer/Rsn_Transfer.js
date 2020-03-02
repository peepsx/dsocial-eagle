require('dotenv').config();
let config = require('../config/arisen');
let RSN = require('arisenjsv1');
let { UserAuth } = require('../models/user');
let { Rsn_Transfer } = require('../models/transfer');

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
    
                let arisen = await UserAuth.findOne({arisen_username});
    
                if(!arisen) {
                 return reject({
                         success: false,
                         message: `user not found ${arisen_username}`
                    })
                }
                  rsn.transfer(process.env.TRANSFER_USER, arisen_username, process.env.AMOUNT, '', config)
                      .then(async (transfer) => {
                          console.log('TRANS', transfer.transaction_id)
                          let rsn_transfered = new Rsn_Transfer({
                              user: id,
                              amount: process.env.AMOUNT,
                              account_from_transfer: process.env.TRANSFER_USER,
                              transaction_id: transfer.transaction_id
                          })
                            await rsn_transfered.save();
                              return resolve({
                                success: true,
                                message: `${process.env.AMOUNT} Rsn has been sent to the user ${arisen_username} account successfully!`,
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
    }
}