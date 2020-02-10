let { faceAuth } = require('../models/facebook')
let { googleAuth } = require('../models/google')
let { InstaAuth } = require('../models/instagram')
let { TwitterAuth } = require('../models/twitter')
let { UserAuth } = require('../models/user')
module.exports = {
    RSN_TRANSFER: async (req, res, next) => {
        let { username, mailaddress,  instausername, twitterusername, arisen } = req.body;
        if(!username || !mailaddress || !instausername || !twitterusername || !arisen) {
            return res.status(200).send({
                success: false,
                message: 'Fields are missing'
            })
        }
        if(username == undefined || mailaddress == undefined || instausername == undefined || twitterusername == undefined || arisen == undefined) {
            return res.status(200).send({
                message: 'Fields are missing'
            })
        }
        let facebook = await faceAuth.findOne({fbUserName: username});
        let google = await googleAuth.findOne({GmailAddress: mailaddress});
        let instagram = await InstaAuth.findOne({Username: instausername});
        let twitter = await TwitterAuth.findOne({username: twitterusername});
        let rsn_user = await UserAuth.findOne({ariser_username: arisen});

        if(facebook && google && instagram && twitter && rsn_user && rsn_user.ariser_username.length == 12) {
            next()
        } else {
            return res.status(200).send({
                success: false,
                message: 'Please complete air drop task'
            })
        }
    }
}