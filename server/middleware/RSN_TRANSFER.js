let { faceAuth } = require('../models/facebook')
let { googleAuth } = require('../models/google')
let { InstaAuth } = require('../models/instagram')
let { TwitterAuth } = require('../models/twitter')
let { UserAuth } = require('../models/user')
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
        
        if(!facebook.facebookid || !facebook.fbUserURL || !facebook.fbPhoto || !facebook.fbUserName || !facebook.fbUserLocation) {
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
    }
}