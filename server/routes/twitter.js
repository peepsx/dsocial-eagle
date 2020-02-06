const express = require('express')
const router = express.Router()


router.post('/',(req,res,next)=>{
    let data = req.body
    if(data){
        res.status(200).json({
            message:('Your data is successfully recived' + data)
        })
    } else {
        res.status(400).json([{
            message:'Something Missing'
        }])
    }
})


module.exports = router