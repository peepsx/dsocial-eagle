require('dotenv').config();
const express = require('express');
var Twit = require('twit');
const router = express.Router();
const Instagram = require('instagram-web-api')

var T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
  });
let getTwitterFollowers = require('get-twitter-followers');
let tokens = {
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
};
let { Access_Token } = require('../middleware/RSN_TRANSFER');
const { TwitterAuth } = require('../models/twitter');
const { faceAuth } = require('../models/facebook');
const { TempTwitter } = require('../models/TempTwitter');
const { TempFacebook } = require('../models/TempFacebook');

router.post('/twitter-details', [Access_Token],  async(req,res)=>{
    let {username, id} = req.body

    if(!username || !id) return res.status(400).send({success: false, message: 'Fields are missing'})
    try{

        let description = await T.get('users/search', { q: username });
        let count = await T.get('followers/ids', { screen_name: username })
    
        let TwitterUserOne = await TwitterAuth.findOne({username: username})
        let TempUser = await TempTwitter.findOne({username: username})
        if(TempUser) return res.status(200).send({

        })

        if(username && TwitterUserOne == null){

          let TwitterNew = new TempTwitter({
            username:username,
            followerscount: count.data.ids.length,
            profileDescription: description.data[0].description || undefined
          })

          TwitterNew.save()
          .then(async ()=>{

              await TempFacebook.findOneAndUpdate({facebookid: id},
                    {$set: {fbUserLocation: description.data[0].location}},
                    {new: true});

              res.status(200).send({
                  success: true,
                  message:'Twitter user saved Sucessfully'
              })
          }).catch(e=>{
              console.log('Something Went Wrong')
          })
        } else {
            res.status(403).send({
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

router.post('/share-social-status', [Access_Token], async (req, res) => {
    let {status, screenname } = req.body;

    if(!status || status == null || !screenname || status == null) return res.status(200).send({success: false, message: 'Fields is missing!'})
    
    if(status === undefined ) return res.status(200).send({success: false, message: 'user have not share post with their friends!'})
    
    let TempTwit = await TempTwitter.findOne({username: screenname});
    
    let api  = await T.get('statuses/user_timeline', {screen_name: screenname, count:100  })

    if(!TempTwit || TempTwit == null) return res.status(404).send({
            success:false,
            message: 'Please complete first steps'
        });

    // if(twitter.follower) return res.status(403).send({success: false, message: 'You have already share with your friend'})
    
    if(Array.isArray(api.data) && !api.data.length) return res.status(200).send({success: false,message: 'Please share with friends first!'})

    if(api.data[0].text !== process.env.text && TempTwit.username !== api.data[0].user.screen_name) {
        return res.status(200).send({
            success: false,
            message: 'Please share with your twitter follower!'
        })
    }

    try {

        if(Array.isArray(status) && !status.length) {
            if(api.data[0].text === process.env.text && TempTwit.username === api.data[0].user.screen_name) {
               
                // await TempTwitter.findOneAndUpdate({username: screenname}, {$set: {follower: true}})
               
               return res.status(200).send({
                    success: true,
                    message: 'user share or post with their friends successfully!'
                })
            }
        }

    } catch(e) {
        console.log('ERROR WHILE SHARE_WITH_FACEBOOK', e)
      return  res.status(401).send({
                success: false,
                message: 'ERROR WHILE SHARE_WITH_FACEBOOK'
            })
    }
})

router.post('/follower', [Access_Token], async (req, res) => {
    let { screen_name, username, password } = req.body;
    if(!screen_name || !username || !password) return  res.status(400).send({success: false, message: 'Fields is missing!'})
    try {
       const client = new Instagram({username, password});
       let login = await client.login();

       if(!login.authenticated) return res.status(404).json({
           success: false,
           message: 'Not a valid instagram user'
        });
       /**INSTAGRAM */
       const followers = await client.getFollowings({ userId: login.userId })
       let follow = followers.data.map(follower => follower.username);
       /**TWITTER */
       let follower = await getTwitterFollowers(tokens, '@ArisenCoin');
       let twit = follower.map(twitter => twitter.screen_name);
       
       if(twit.indexOf(screen_name) !== -1 && follow.indexOf("arisencoin") !== -1) {
        return res.status(200).send({
            success: true,
            message: 'user like and follow our platform'
        });
       } else {
        return res.status(200).send({
            success: false,
            message: 'Please Follow all platform!'
        });
       }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            success: false,
            message: 'Server Error'
        });
    }
})

module.exports = router