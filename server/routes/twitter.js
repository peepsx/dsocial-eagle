const express = require('express')
const router = express.Router()
const {TwitterAuth} = require('../models/twitter')



router.post('/twitter-details', async(req,res,next)=>{
    let {username,followerscount,profileDescription} = req.body
    console.log(req.body)
    let TwitterUserOne = await TwitterAuth.findOne({username:username})
    try{
        if(username && TwitterUserOne == null){
          let TwitterNew = new TwitterAuth({
            username:username
          })
          TwitterNew.save()
          .then(()=>{
              res.status(200).send({
                  message:'Logged Sucessfully'
              })
          }).catch(e=>{
              console.log('Something Went Wrong')
          })
        } else {
            res.status(401).send({
                message:"Already Register"
            })
        }
    }

    catch(e) {
        res.status(404).send({
            message: "Not Found"
        })
    }
 
})


module.exports = router