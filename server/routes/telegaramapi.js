'use strict';

let express = require('express');
let router = express.Router();
let { TelegramDetail } = require('../models/telegram')

router.post('/telegram', async (req, res) => {
    let { id, first_name, last_name } = req.body;
    
    if(!id || !first_name || !last_name) return res.status(400).send({success: false,message: 'Fields are missing'});

    let checkTelegram = await TelegramDetail.findOne({telegram_id: id});
    
    if(checkTelegram) return res.status(403).send({success: false, message: 'Telegram user already register'});
    
    try {
        let newTelegram = new TelegramDetail({
            telegram_id: id,
            username: first_name+" "+last_name
        })
         await newTelegram.save();
        
        return res.status(200).send({
            success: true,
            message: 'Telegram Detail Saved'
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