const express = require('express')
const router = express.Router()



router.post('/',(req,res,next)=>{
    let {Gmailadderes} = req.body
    if(Gmailadderes){
        res.status(200).send({
            message:"You are succesfully login"
        })
    }else{
        res.status(400).send({
            message:'User not found '
        })
    }
})


module.exports = router