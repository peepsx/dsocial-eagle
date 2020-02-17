require('dotenv').config();
let config = require('../config/arisen');
let RSN = require('arisenjsv1');
let { UserAuth } = require('../models/user');
let rsn = new RSN(config)


module.exports = {
    Rsn_Transfer: async (arisen_username, id) => {
      return  new Promise(async (resolve, reject) => {

            if(!arisen_username || arisen_username == undefined || arisen_username ==null || !id) {
                return reject({
                       success: false,
                        message: `Fields are missing !`
                    })
            }

            let arisen = await UserAuth.findOne({arisen_username});

            if(!arisen) {
             return   reject({
                     success: false,
                     message: `user not found ${arisen_username}`
                }   )
            }
                return   resolve({
                        success: true,
                        message: `Rsn successfully transfer`
                   })
                   
        // rsn.transfer(process.env.TRASFERUSER, arisen_username, process.env.AMOUNT, '', config)
        //     .then(async (transfer) => {
        //         let rsn_transfered = new Rsn_Transfer({
        //             user: id,
        //             amount: process.env.AMOUNT,
        //             account_from_transfer: process.env.TRASFERUSER
        //         })
        //         if(transfer) {
        //           await rsn_transfered.save();
        //             return resolve({
        //               success: true,
        //               message: `${process.env.AMOUNT} Rsn has been sent to the user ${arisen_username} account successfully!`
        //             })
        //         }
        //     })
        //     .catch(e => {
        //         console.log(e)
        //         callback(null, {
        //             success: false,

        //         })
        //     })
      })
    }
}