require('dotenv').config();

let jwt = require('jsonwebtoken');

module.exports = {
    RSN_TRANSFER: async (req, res, next) => {
        let { fbUserId, googleEmail, /**instaUserId, teleUserId, */ twitterScreenName } = req.body.userDetails;

        if(fbUserId) {
            let facebook = await TempFacebook.findOne({facebookid: fbUserId});
            if(!facebook.facebookid || !facebook.fbUserName || facebook === null ) {
                return res.status(401).send({
                    success: false,
                    message: 'Please Login with Facebook'
                })
            }
        }
        if(googleEmail) {
            let google = await TempGoogle.findOne({GmailAddress: googleEmail});
            if(!google.GmailAddress || google === null) {
                return res.status(401).send({
                    success: false,
                    message: 'Please Login with Google'
                })
            }
        }
        if(twitterScreenName) {
            let twitter = await TempTwitter.findOne({username: twitterScreenName});
            if(!twitter.username || twitter === null) {
                return res.status(401).send({
                    success: false,
                    message: 'Please Login with Twitter'
                })
            }
        }
        if(fbUserId || googleEmail || twitterScreenName) {
            next();
        }
        else {
            return res.status(200).send({
                message: 'Fields are missing'
            })
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