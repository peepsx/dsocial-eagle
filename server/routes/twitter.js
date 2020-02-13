require('dotenv').config();
const express = require('express')
var Twit = require('twit')
const router = express.Router()
var T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
  })
const {TwitterAuth} = require('../models/twitter')

router.post('/twitter-details', async(req,res)=>{
    let {username} = req.body
    try{

        let description = await T.get('users/search', { q: username })
    
        let count = await T.get('followers/ids', { screen_name: username })
    
        let TwitterUserOne = await TwitterAuth.findOne({username:username})

        if(username && TwitterUserOne == null){

          let TwitterNew = new TwitterAuth({
            username:username,
            followerscount: count.data.ids.length,
            profileDescription: description.data[0].description
          })

          TwitterNew.save()
          .then(()=>{
              res.status(200).send({
                  success: true,
                  message:'Twitter user saved Sucessfully'
              })
          }).catch(e=>{
              console.log('Something Went Wrong')
          })
        } else {
            res.status(200).send({
                success: false,
                message:"Already Register"
            })
        }
    }

    catch(e) {
        if(e.message === 'Sorry, that page does not exist.') {
            return res.status(404).send({
                message: `User not found for your given username ${username} please try again!`
            })
        } else {
            console.log('TWITTER ERROR', e)
            res.status(401).send({
                message: "Something went wrong"
            })
        }
    }
 
})

router.post('/share-twitter-status', async (req, res) => {
    let {status} = req.body;
    console.log('Share-twitter',typeof status)
    if(!status || status == null) return res.status(200).send({success: false, message: 'Fields is missing!'})
    if(status === undefined ) return res.status(200).send({success: false, message: 'user have not share post with their friends!'})
    try {
        if(status == '[]') {
            res.status(200).send({
                success: true,
                message: 'user share or post with thier friends successfully!'
            })
        } else {
            res.status(200).send({
                success: false,
                message: 'user have not share or post with thier friends!'
            })
        }
    } catch(e) {
        console.log('ERROR WHILE SHARE_WITH_FACEBOOK', e)
        res.status(401).send({
            success: false,
            message: 'ERROR WHILE SHARE_WITH_FACEBOOK'
        })
    }
})


module.exports = router