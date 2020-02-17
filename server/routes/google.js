const express = require('express')
const router = express.Router()
const {googleAuth} = require('../models/google')
const validator = require('validator')


router.post('/google-detail', async(req,res,next)=>{
    let {GmailAddress} = req.body

    if(!validator.isEmail(GmailAddress[0])) {
        return res.status(401).send({
            status: false,
            message: 'Email is not valid'
        })
    }

    let UserName = await googleAuth.findOne({GmailAddress:GmailAddress[0]})

    try{
    
        if(GmailAddress[0] && UserName == null){
            let newGmail = new googleAuth({
                GmailAddress:GmailAddress[0]
            })
            newGmail.save()
                    .then(() => {
                        res.status(200).send({
                            success: true,
                            message: 'Google details saved'
                        })
                    })
                    .catch(e => {
                        console.log('Something went wrong')
                    })
        } else {
            res.status(403).send({
                message:"Already Register"
            })
        }
    }
    catch(e) {
        res.status(500).send({
            message: "Something went Wrong"
        })
    }

   
})


module.exports = router


// if(Gmailadderes){
//     res.status(200).send({
//         message:"You are succesfully"
//     })
// }else{
//     res.status(400).send({
//         message:'User not found '
//     })
// }