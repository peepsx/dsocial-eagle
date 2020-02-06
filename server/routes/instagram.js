const express = require('express')
const router = express.Router()


router.post('/',(req,res,next)=>{
    res.send({
        followerCount:req.body.followerCount,
        Username:req.body.Username
    })
})


module.exports = router