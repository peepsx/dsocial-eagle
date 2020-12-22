var express = require('express');
var router = express.Router();
let bcrypt = require('bcryptjs');
const  { MVerify } = require('../models/Mobile')
const { Rsn_Transfer } = require('../Transfer/Rsn_Transfer')
const { body, validationResult } = require('express-validator');
let {Account_SID, Auth_Token} = require('../config/index');

const client = require('twilio')(Account_SID, Auth_Token);


let generator = require('generate-password');

router.post('/send-sms',[
    body('mobile').isNumeric(),
], async (req, res) => {
    try {
        let { mobile, username } = req.body;
        let errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(200).json({errors: errors.array()});
        }

        let findOne = await MVerify.findOne({mobile})
        
        if(findOne !== null) {
            return res.status(200).json({success: false, message: 'Mobile already exit'});
        }
      
        var password = generator.generate({
            length: 4,
            numbers: true
        });
        let salt = await bcrypt.genSalt(4);
        let hash = await bcrypt.hash(password, salt);
        let newTempUser = new MVerify({
            mobile: mobile,
            token: password,
            username: username
        })
        newTempUser.token = hash;
        client.messages
                    .create({
                        to: '+12517664817',
                        from: '+14697221209',
                        body: `Your dSocial SMS Verification Code Is ${newTempUser.token}`,
                    })
                    .then(async (sms) => {
                        console.log(client.httpClient.lastResponse.statusCode)
                        await newTempUser.save();

                        return res.status(200).send({
                            success: true,
                            sms
                        })
                    })
                    .catch(e => {
                        console.log('ssss', e)
                        return res.status(200).send({
                            success: false,
                            message: 'Mobile number is invalid'
                        })
                    })
    } catch (error) {
        console.log('SENDING SMS', error)
        return res.status(500).send({success: false, message: "server error"})
    }
})

router.post('/mobile-token', async (req, res) => {
    let { code, amount } = req.body;

    try {
        let token = await MVerify.findOne({token: code})
        if(token) {
            Rsn_Transfer(token.username, token.id, amount)
                .then(data => {
                    return res.status(200).json({
                        data: data,
                        status: true,
                        message: 'Successfully transfer'
                    })
                })
                .catch(e => {
                    console.error("TRANSFER ERROR", e)
                })
        } else {
            return res.status(200).json({
                success: false,
                message: 'token is wrong'
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'Internal Server Error'})
    }
     
})

module.exports = router