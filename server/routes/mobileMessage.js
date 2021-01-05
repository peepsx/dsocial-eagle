var express = require('express');
var router = express.Router();
let bcrypt = require('bcryptjs');
const  { MVerify } = require('../models/Mobile')
const { Rsn_Transfer } = require('../Transfer/Rsn_Transfer')
const { Rsn_Transfers } = require('../models/transfer')
const  { EVerify } = require('../models/Email')


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

        var password = generator.generate({
            length: 6,
            numbers: true,
            uppercase: false
        });

        MVerify.findOne({mobile:mobile}).then((r_db)=>{

                 console.log("r_db",r_db);

                 if(r_db == null){
                      console.log("r_db null");
                      let newTempUser = new MVerify({
                        mobile: mobile,
                        token: password,
                        username: username,
                        count:1
                    })

                    client.messages
                    .create({
                        to: mobile,
                        from: '+1 4697221209',
                        body: `Your dSocial SMS Verification Code Is ${password}`,
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

                 }
                 else if(r_db && r_db.count < 3){
                    let count_ = r_db.count +1;

                    client.messages
                    .create({
                        to: mobile,
                        from: '+1 4697221209',
                        body: `Your dSocial SMS Verification Code Is ${password}`,
                    })
                    .then(async (sms) => {
                        console.log(client.httpClient.lastResponse.statusCode)
                        await MVerify.findOneAndUpdate({mobile:mobile},{$set: {"token":password , "count":count_}},{new :true})

                        return res.status(200).send({
                            count : count_,
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

                 }
                 else {
                    return res.status(200).json({success: false, message: 'Please check your mobile inbox for code'});

                 }
                }).catch((ex)=>{

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
            let verified =  await MVerify.findOneAndUpdate({username:token.username}, {$set: {tokenverified: true}}, {new: true})

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
            let claimed = await Rsn_Transfers.findOne({user:username})
            console.log("cklaimed",claimed);
            if(claimed){
                return res.status(200).json({
                    success: false,
                    message: 'Already Claimed',
                    respCode:1002
                })
            }
            else{
                let m_verified = await MVerify.findOne({username: username});
                let e_verified = await EVerify.findOne({username: username})

                console.log("m_verified",m_verified);
                console.log("e_verified",e_verified);

                if(!m_verified && !e_verified){
                    
                    return res.status(200).json({
                        success: false,
                        message: 'Please verify Both Phone number and Email',
                        respCode:1003
                        })
                    
                     }
                else{
                     Rsn_Transfer(username, token._id, amount)
                    .then(() => {

                        return res.status(200).json({
                            success: true,
                            message: 'Reward successfully send',
                            respCode:10000
                        })
                    })
                    .catch(() =>{
                        return res.status(200).json({
                            success: false,
                            message: 'Unable to send reward',
                            respCode:1001

                        })
                    })
                }
                }
                    
              
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