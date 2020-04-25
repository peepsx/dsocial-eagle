require('dotenv').config();
const express = require('express');
var Twit = require('twit');
const router = express.Router();
const { IgApiClient } = require('instagram-private-api');

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
const { TempInstagram } = require('../models/TempInstagram');

router.post('/twitter-details', [Access_Token],  async(req,res)=>{
    let {username, id} = req.body

    if(!username || !id) return res.status(400).send({success: false, message: 'Fields are missing'})
    try{

        let description = await T.get('users/search', { q: `@${username}` });
        let count = await T.get('followers/ids', { screen_name: `@${username}` })
        let TwitterUserOne = await TwitterAuth.findOne({username: username})
        let TempUser = await TempTwitter.findOne({username: username})
        if(TempUser) return res.status(200).send({
                  success: true,
                  message:'You have logging successfully!'
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
                  message:'You have logging successfully!'
              })
          }).catch(e=>{
              console.log('Something Went Wrong')
          })
        } else {
            res.status(403).send({
                success: false,
                message:"You have already register with us!"
            })
        }
    }

    catch(e) {
        if(e.message === 'Sorry, that page does not exist.') {
            return res.status(404).send({
                message: 'Invalid user id'
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

    if(!status || status == null || !screenname || screenname == null) return res.status(200).send({success: false, message: 'Fields is missing!'})
    
    if(status === undefined || username === undefined ) return res.status(200).send({success: false, message: 'Please share with your friends!'})
    
    let TempTwit = await TempTwitter.findOne({username: screenname});
    let api  = await T.get('statuses/user_timeline', {screen_name: screenname, count:100  })

    if(!TempTwit || TempTwit == null) return res.status(404).send({
            success:false,
            message: 'Please complete first steps'
        });

    // if(twitter.follower) return res.status(403).send({success: false, message: 'You have already share with your friend'})
    
    if(Array.isArray(api.data) && !api.data.length) return res.status(200).send({success: false,message: 'Please share with friends first!'})

    if(!api.data[0].text.includes(process.env.text) && TempTwit.username !== api.data[0].user.screen_name) {
        return res.status(200).send({
            success: false,
            message: 'Please share on your twitter page'
        })
    }

    try {

        if(Array.isArray(status) && !status.length) {
               await TempTwitter.findOneAndUpdate({username: screenname}, {$set: {follower: true}})
               
               return res.status(200).send({
                    success: true,
                    message: 'You have successfully share with your friends'
                })
        } else {
            return res.status(200).send({
                success: false,
                message: 'Please share with titter friends'
            });
        }

    } catch(e) {
        console.log('ERROR WHILE SHARE_WITH_FACEBOOK', e)
      return  res.status(401).send({
                success: false,
                message: 'Something went wrong'
            })
    }
})

router.post('/follower', [Access_Token], async (req, res) => {
    
    let { screen_name, username } = req.body;

    if(!screen_name || !username) return  res.status(400).send({
            success: false,
            message: 'Fields is missing!'
        })
    
    let validTwiFollower = await TempTwitter.findOne({username: screen_name});

    let validInstagramFollower = await TempInstagram.findOne({username: username});
    
    if(!validInstagramFollower) return res.status(404).send({
        success: false,
        message: 'Invalid instagram user id'
    })

    if (!validTwiFollower) return res.status(404).send({
        success: false,
        message: 'Invalid twitter user id'
    })

    try {
        const ig = new IgApiClient();
        ig.state.generateDevice(process.env.username)
        const auth = await ig.account.login(process.env.username, process.env.password);
        const followersFeed = ig.feed.accountFollowers(auth.pk);
        const followers = await followersFeed.request();

       if(!followers) return res.status(404).json({
           success: false,
           message: 'Not a valid instagram user'
        });
       /**INSTAGRAM */
       let follow = followers.users.map(follower => follower.username);
       /**TWITTER */
       let follower = await getTwitterFollowers(tokens, '@ArisenCoin');
       let twit = follower.map(twitter => twitter.screen_name);
       
       if(twit.indexOf(screen_name) !== -1 && follow.indexOf(username) !== -1) {
        return res.status(200).send({
            success: true,
            message: 'You have liked successfully'
        });
       } else {
        return res.status(200).send({
            success: false,
            message: 'Please like previous social media platform'
        });
       }
    } catch (error) {
        console.log("TWITTER AND INSTAGRAM FOLLOWER ERROR", error.message);
        return res.status(500).send({
            success: false,
            message: 'Server Error'
        });
    }
})

module.exports = router