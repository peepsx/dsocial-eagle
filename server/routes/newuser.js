let router = require('express').Router();
let { Account } = require('../models/newAccounts');
let axios = require('axios');

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
    console.log('User', user, ownerPubKey, activePubKey)
    let register = await axios(`https://nv6khovry9.execute-api.us-east-1.amazonaws.com/dev/newuser/${user}/${ownerPubKey}/${activePubKey}`)
                
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
                    .then(data => res.status(200).json({success: true, data: data}))
                    .catch(e => res.status(500).json({
                        success: false,
                        message: 'Server Error'})
                        )
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