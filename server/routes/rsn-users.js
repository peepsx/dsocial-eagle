let router = require('express').Router();
let { Account } = require('../models/newAccounts');

router.post('/check-user', async (req, res) => {
    let { sender_username } = req.body;

    if(!sender_username) return res.status(400).json({
        success: false,
        message: 'Fields is missing'
    })

    try {
        let rsn_user = await Account.findOne({main_user: sender_username});
        if(!rsn_user) return res.status(200).json({
            success: false,
            message: 'This is new user'
        })

        return res.status(200).json({
            success: true,
            data: rsn_user.new_user
        })
    } catch (error) {
        console.log('ERROR NEW RSN-TRANSFER USER CHECK', error)
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }

})

module.exports = router;