require('dotenv').config();
let { faceAuth } = require('../models/facebook')
let { googleAuth } = require('../models/google')
let { InstaAuth } = require('../models/instagram')
let { TwitterAuth } = require('../models/twitter')
let { UserAuth } = require('../models/user')
let jwt = require('jsonwebtoken');

module.exports = {
    RSN_TRANSFER: async (req, res, next) => {
        let { fbUserId, googleEmail, instaUserId, teleUserId, twitterScreenName } = req.body.userDetails;
        if( !googleEmail || !instaUserId || !twitterScreenName || !teleUserId || !fbUserId) {
            return res.status(200).send({
                success: false,
                message: 'Fields are missing'
            })
        }
        if(fbUserId == undefined  || googleEmail == undefined || instaUserId == undefined || twitterScreenName == undefined) {
            return res.status(200).send({
                message: 'Fields are missing'
            })
        }
        let facebook = await faceAuth.findOne({facebookid: fbUserId});
        let google = await googleAuth.findOne({GmailAddress: googleEmail});
        let instagram = await InstaAuth.findOne({id: instaUserId});
        let twitter = await TwitterAuth.findOne({username: twitterScreenName});
        
        if(!facebook.facebookid || !facebook.fbUserName ) {
            return res.status(401).send({
                success: false,
                message: 'Please Login with Facebook'
            })
        } else if(!google.GmailAddress) {
            return res.status(401).send({
                success: false,
                message: 'Please Login with Google'
            })
        } else if(!instagram.id || !instagram.username) {
            return res.status(401).send({
                success: false,
                message: 'Please Login with Instagram'
            })
        } else if(!twitter.username || !twitter.profileDescription) {
            return res.status(401).send({
                success: false,
                message: 'Please Login with Twitter'
            })
        } else {
            next();
        }
    },
    Access_Token: async (req, res, next) => {
            let token = req.header('Authorization');
           try {
                
            if(!token) return res.status(401).send({success: false, message: 'Invalid Token'});

            let user = await jwt.verify(token, process.env.JWT);
            req.user = user.user;

            if(user) {
                next();
            } else {
                return res.status(401).send({success: false, message: 'Invalid Token'});
            }
           } catch (error) {
               console.log('ERROR WHILE TOKEN DECODE', error.message);
               return res.status(500).send({success: false, message: 'Server Error'});
           }
    }
}