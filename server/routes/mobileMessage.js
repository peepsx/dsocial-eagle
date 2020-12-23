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
            length: 6,
            numbers: true,
            uppercase: false
        });
  
        let newTempUser = new MVerify({
            mobile: mobile,
            token: password,
            username: username
        })
        
        client.messages
                    .create({
                        to: '+91'+mobile,
                        from: '+12517664817',
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
            
                    return res.status(200).json({
                        success: true,
                        message: 'Token successfully verified'
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

router.post('/send/reward', async (req, res) => {
    let { status, amount, username } = req.body;

    try {
        let token = await MVerify.findOne({username: username})
        if(status) {
            Rsn_Transfer(username, token._id, amount)
                    .then(() => {
                        return res.status(200).json({
                            success: true,
                            message: 'Reward successfully send'
                        })
                    })
                    .catch(() =>{
                        return res.status(200).json({
                            success: false,
                            message: 'Unable to send reward'
                        })
                    })
                    
              
        } else {
            return res.status(200).json({
                success: false,
                message: 'Please select terms and conditions'
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'Internal Server Error'})
    }
     
})

module.exports = router