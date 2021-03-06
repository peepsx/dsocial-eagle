// FOR Exchange
let router = require('express').Router();
let { Account } = require('../models/newAccounts');
let axios = require('axios');
let { httpEndpoint, chainId, keyProvider} = require('../config/arisen');
let  { SERVER_LESS } = require('../config');
let RSN = require('arisenjsv1');
let rsn = RSN({httpEndpoint, chainId, keyProvider});

/**CREATE NEW USER FOR RSN-ACCOUNT */
router.post('/user', async (req, res) => {
    let {
        user,
        sender_username,
        ownerPubKey,
        activePubKey,
        ownerprivateKey,
        activeprivateKey
     } = req.body;
    
try {
    let checkValidRsnUser = await rsn.getAccount(sender_username);
        
    if(!checkValidRsnUser) return res.status(404).json({
        success: false,
        message: 'Arisen username not found'
    })

    let rsn_user = await Account.findOne({main_user: sender_username});
    if(rsn_user) {
        return res.status(200).json({
            success: true,
            arisen_account: rsn_user.new_user
        })
    } else {
        let register = await axios(`${SERVER_LESS}${user}/${ownerPubKey}/${activePubKey}`)
                
        if(register) {
         let new_rsn_user = new Account({
                            main_user: sender_username,
                            new_user: user,
                            owner_pub_key: ownerPubKey,
                            active_pub_key: activePubKey,
                            owner_private_key: ownerprivateKey,
                            active_private_key: activeprivateKey
                        })
        new_rsn_user.save()
                        .then(data => res.status(200).json({success: true, arisen_account: new_user}))
                        .catch(e => res.status(500).json({
                            success: false,
                            message: 'Server Error'})
                            )
        }
    }
} catch (error) {
        console.log('ERROR NEW USER CREATION', error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;