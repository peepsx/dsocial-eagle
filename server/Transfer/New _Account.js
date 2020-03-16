let Rsn = require('arisenjsv1');
let config = require('../config/arisen');
let rsn = Rsn(config);


module.exports = {
    rsn_account: async (account, ownerpubkey, activepubkey ) => {
          return new Promise((resolve, reject) => {
            try {
                rsn.transaction(tr => {
                    tr.newaccount({
                      creator: config.creatorAccountName,
                      name: account,
                      owner: ownerpubkey,
                      active: activepubkey
                    })
                   
                    tr.buyrambytes({
                      payer: config.creatorAccountName,
                      receiver: account,
                      bytes: 8192
                    })
                   
                    tr.delegatebw({
                      from: config.creatorAccountName,
                      receiver: account,
                      stake_net_quantity: '0 RSN',
                      stake_cpu_quantity: '0 RSN',
                      transfer: 0
                    })
                  })
                  .then(res => {
                      resolve({
                          status: 200,
                          success: true,
                          data: res
                      })
                      return;
                  })
                  .catch(e => {
                      reject({
                        status: 401,
                        success: false,
                        message: 'Something went wrong'
                      })
                      return;
                  })
            } catch (error) {
                console.log('ERROR ACCOUNT CREATION FOR BLOCKCHAIN', error.message);
                reject({
                    status: 500,
                    success: false,
                    message: 'Server Error'
                })
                return;
              }
            })
    }
}