require('dotenv').config();
const express = require('express')
const router = express.Router()
const { googleAuth } = require('../models/google');
const { TempGoogle } = require('../models/TempGoogle');
const validator = require('validator');
let { Access_Token } = require('../middleware/RSN_TRANSFER')
let axios = require('axios');

router.post('/google-detail', [Access_Token], async(req,res,next)=>{
    
    let {GmailAddress, access_token} = req.body

    if(!validator.isEmail(GmailAddress[0])) {
        return res.status(401).send({
            status: false,
            message: 'Email is not valid'
        })
    }

    let UserName = await googleAuth.findOne({GmailAddress:GmailAddress[0]})
    let TempUser = await TempGoogle.findOne({GmailAddress:GmailAddress[0]})
    
    if(TempUser) return res.status(200).send({
            success: false,
            message: 'Please try after one an hour!'
        });

    try{
        let valid = await axios.get(process.env.GOOGLE_API_URL+access_token);
        if(!valid) return res.status(404).send({success: false, message: 'Email is invalid!'})
        
        if(GmailAddress[0] && UserName == null){
            let newGmail = new TempGoogle({
                GmailAddress:GmailAddress[0]
            })
            newGmail.save()
                    .then(() => {
                        res.status(200).send({
                            success: true,
                            message: 'You have logged in successfully!'
                        })
                    })
                    .catch(e => {
                        console.log('Something went wrong')
                    })
        } else {
            res.status(403).send({
                message:"You have already register with us!"
            })
        }
    }
    catch(e) {
        res.status(500).send({
            message: "Something went Wrong"
        })
    }

   
})


module.exports = router;