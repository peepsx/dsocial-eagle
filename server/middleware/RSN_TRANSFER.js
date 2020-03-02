require('dotenv').config();
let { TempFacebook } = require('../models/TempFacebook')
let { TempGoogle } = require('../models/TempGoogle')
let { TempInstagram } = require('../models/TempInstagram')
let { TempTwitter } = require('../models/TempTwitter')
let { TempTelegram } = require('../models/TempTelegram')
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
        let facebook = await TempFacebook.findOne({facebookid: fbUserId});
        let google = await TempGoogle.findOne({GmailAddress: googleEmail});
        let instagram = await TempInstagram.findOne({username: instaUserId});
        let twitter = await TempTwitter.findOne({username: twitterScreenName});
        let telegram = await TempTelegram.findOne({telegram_id: teleUserId});
        if(!facebook.facebookid || !facebook.fbUserName || facebook === null ) {
            return res.status(401).send({
                success: false,
                message: 'Please Login with Facebook'
            })
        } else if(!google.GmailAddress || google === null) {
            return res.status(401).send({
                success: false,
                message: 'Please Login with Google'
            })
        } else if(!instagram.instaid || !instagram.username || instagram === null) {
            return res.status(401).send({
                success: false,
                message: 'Please Login with Instagram'
            })
        } else if(!twitter.username || twitter === null) {
            return res.status(401).send({
                success: false,
                message: 'Please Login with Twitter'
            })
        } else if(!telegram.telegram_id || telegram === null) {
            return res.status(401).send({
                success: false,
                message: 'Please Login with Twitter'
            })
        }
        else {
            next();
        }
    },
    Access_Token: async (req, res, next) => {
            let token = req.header('Authorization').split(' ')[1];
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