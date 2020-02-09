const express = require('express')
const router = express.Router()
const {googleAuth} = require('../models/google')



router.post('/google-detail', async(req,res,next)=>{
    let {GmailAddress} = req.body

    let UserName = await googleAuth.findOne({GmailAddress:GmailAddress})

    try{
    
        if(GmailAddress && UserName == null){
            let newGmail = new googleAuth({
                GmailAddress:GmailAddress 
            })
            newGmail.save()
                    .then(() => {
                        res.status(200).send({
                            message: 'Sucessfully saved'
                        })
                    })
                    .catch(e => {
                        console.log('Somrthing went wrong')
                    })
        } else {
            res.status(401).send({
                message:"Already Register"
            })
        }
    }
    catch(e) {
        res.status(404).send({
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