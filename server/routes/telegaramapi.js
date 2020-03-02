'use strict';

let express = require('express');
let router = express.Router();
let { TelegramDetail } = require('../models/telegram')
let { TempTelegram } = require('../models/TempTelegram')
let { Access_Token } = require('../middleware/RSN_TRANSFER');

router.post('/telegram', [Access_Token], async (req, res) => {
    let { id, first_name, last_name } = req.body;
    
    if(!id || !first_name || !last_name) return res.status(400).send({success: false,message: 'Fields are missing'});

    let TempTele = await TempTelegram.findOne({telegram_id: id});
    if(TempTele)  return res.status(200).send({success: false, message: 'Please wait for an one hour'});
    let checkTelegram = await TelegramDetail.findOne({telegram_id: id});
    
    if(checkTelegram) return res.status(403).send({success: false, message: 'You have already register with us!'});
    
    try {
        let newTelegram = new TempTelegram({
            telegram_id: id,
            username: first_name+" "+last_name
        })
         await newTelegram.save();
        
        return res.status(200).send({
            success: true,
            message: 'You have logging successfully!'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Server Error"
        })
    }
})

module.exports = router;