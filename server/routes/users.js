var express = require('express');
var router = express.Router();
/**MAIN DB */
const ethers = require('ethers');
let generator = require('generate-password');
let bcrypt = require('bcryptjs');
let { Token } = require('../middleware/Token');
const { UserAuth } = require('../models/user');
const { faceAuth } = require('../models/facebook');
const { userAuthTemp } = require('../models/authTemp');
const { userAuth } = require('../models/auth');
const { TwitterAuth } = require('../models/twitter');
// const { InstaAuth } = require('../models/instagram');
const { googleAuth } = require('../models/google');
const { Ip } = require('../models/ip');
// const { TelegramDetail } = require('../models/telegram');
/**TEMP MODEL */
const { TempFacebook } = require('../models/TempFacebook');
const { TempTwitter } = require('../models/TempTwitter');
// const { TempInstagram } = require('../models/TempInstagram');
const { TempGoogle } = require('../models/TempGoogle');
// const { TempTelegram } = require('../models/TempTelegram');

var validator = require('validator');
let axios = require('axios');
let { RSN_TRANSFER, Access_Token } = require('../middleware/RSN_TRANSFER'); 
let { Rsn_Transfer } = require('../Transfer/Rsn_Transfer')

router.post('/users-details', [RSN_TRANSFER, Access_Token],  async (req, res) => {

    let { arisen_username, ip } = req.body;
    let { fbUserId, googleEmail, /**instaUserId, teleUserId, */ twitterScreenName, username } = req.body.userDetails
    console.log(arisen_username, ip, fbUserId, googleEmail,/** instaUserId, teleUserId, */ twitterScreenName, username,'USER IDS');
    let UserOne = await UserAuth.findOne({arisen_username: arisen_username })
    let UserTwo = await userAuth.findOne({arisen_username: arisen_username })
    let TempFace = await TempFacebook.findOne({facebookid: fbUserId}).select('-_id -__v');
    let TempUser = await userAuthTemp.findOne({username: username});
    let TempTwit = await TempTwitter.findOne({username: twitterScreenName}).select('-_id -__v');
    // let TempInsta = await TempInstagram.findOne({username: instaUserId}).select('-_id -__v');
    let TempGo = await TempGoogle.findOne({GmailAddress: googleEmail}).select('-_id -__v');
    // let TempTele = await TempTelegram.f ndOne({telegram_id: teleUserId}).select('-_id -__v');
    let address = ip.v4 === ip.v6 ? ip.v4 : [ip.v4, ip.v6]
        address = [address];
    if(arisen_username.length !== 12) return res.status(200).send({message: 'A PeepsID must be 12 characters or less', success: false});
    if(!arisen_username || !ip || ip == undefined) return res.status(400).send({success: false, message: 'Fields are missing!'})
    
    let ipAddress = await UserAuth.find({ ip_address: {$in: address}})

    if (UserOne) {
        return res.status(403).json("You have already register with us!")
    }
    else if (UserTwo) {
        return res.status(403).json("You have already register with us!")
    }
    else if (ipAddress[0]) {
        return res.status(403).send({
            success: false,
            message: 'This ip-address has been used please change your ip first'
        })
    }

    try {
        axios.get(`https://nv6khovry9.execute-api.us-east-1.amazonaws.com/dev/lookup/${arisen_username}`)
            .then(async (lookup) => {
                let NewUser = new UserAuth({
                    arisen_username: arisen_username,
                    ip_address: ip.v4 === ip.v6 ? ip.v4 : ip.v6
                })
                let user = await NewUser.save();
                if(lookup.data.details.account_name === arisen_username) {
                    if (email && arisen_username && UserOne == null) {
                           Rsn_Transfer(arisen_username, user.id)
                                    .then(async TRANSFER => {
                                        if(TRANSFER.success) {

                                            let ipv4 = new Ip({
                                                ip_address: address
                                            })
                                            await ipv4.save();
                                            let userRegister = new userAuth({
                                                username: TempUser.username,
                                                password: TempUser.password,
                                            })
                                            let FaceBook = new faceAuth({
                                                follower: TempFace.follower,
                                                facebookid: TempFace.facebookid,
                                                fbPhoto: TempFace.fbPhoto,
                                                fbUserName: TempFace.fbUserName,
                                                password: TempFace.password
                                            });
                                            let Twitter = new TwitterAuth({
                                                username: TempTwit.username,
                                                follower: TempTwit.follower,
                                                profileDescription: TempTwit.profileDescription,
                                                followerscount: TempTwit.followerscount
                                            });
                                            // let Instagram = new InstaAuth({
                                            //     instaid: TempInsta.instaid,
                                            //     follower: TempInsta.follower,
                                            //     username: TempInsta.username
                                            // });
                                            let Google = new googleAuth({
                                                GmailAddress: TempGo.GmailAddress
                                            });
                                            // let Telegram = new TelegramDetail({
                                            //     telegram_id: TempTele.telegram_id,
                                            //     username: TempTele.username
                                            // });
                                            userRegister.save()
                                                .then(async user => {
                                                    await TempUser.findOneAndDelete({username: user.username})
                                                })
                                                .catch(err => console.log("while DELETING TEMP USER", err));
                                             Twitter.save()
                                                .then(async user => {
                                                    await TempTwitter.findOneAndDelete({username: user.username});
                                                })
                                                .catch(e => console.log('WHILE DELETING TEMP USER', e))
                                            //  Instagram.save()
                                            //     .then(async user => {
                                            //         await TempInstagram.findOneAndDelete({username: user.username});
                                            //     })
                                            //     .catch(e => console.log('WHILE DELETING TEMP USER', e))
                                             Google.save()
                                                .then(async user => {
                                                    await TempGoogle.findOneAndDelete({GmailAddress: user.GmailAddress});
                                                })
                                                .catch(e => console.log('WHILE DELETING TEMP USER', e))
                                            //  Telegram.save()
                                            //     .then(async user => {   
                                            //         await TempTelegram.findOneAndDelete({username: user.username});
                                            //     })
                                            //     .catch(e => console.log('WHILE DELETING TEMP USER', e))
                                             FaceBook.save()
                                                .then(async user => {   
                                                    await TempFacebook.findOneAndDelete({facebookid: user.facebookid});
                                                })
                                                .catch(e => console.log('WHILE DELETING TEMP USER', e))
                                             await NewUser.save();

                                            return res.status(200).send({
                                                success: true,
                                                message: TRANSFER.message,
                                                transaction_id: TRANSFER.transaction_id
                                            })
                                        }
                                    })
                                    .catch(e => {
                                        console.log("USER SAVED BUT RSN DID NOT TRANSFER", e)
                                        return res.status(500).send({
                                            message: "Server error"
                                        })
                                    })
                    } else {
                        res.status(401).send({
                            message: "Already Register"
                        })
                    }
                }
            })
            .catch((e) => {
                return res.status(200).send({
                    success: false,
                    message: 'User not found ERROR'
                })
            })
    }
    catch (e) {
       return res.status(404).send({
                message: "User not found"
            })
    }
})

router.post('/register', async (req, res) => {
    try {
        let { username } = req.body;
        if(username.length !== 12 || username === null || username === undefined || username === '') 
            return res.status(200).send({success: false, message: 'username is invalid'})
        let findOne = await userAuth.findOne({username: username})
        let TempFb = await userAuthTemp.findOne({username: username})

        if(TempFb) return res.status(200).send({
                    success: true,
                    token: TempFb.token,
                    message:'You have logging successfully!',
            })
        
        if(findOne) return res.status(403).send({
                success: false,
                message: 'You have already register with us!'
            })
        
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        let newTempUser = new userAuthTemp({
            username: username
        })
        newTempUser.password = hash;
        newTempUser.save()
            .then(async (us) => {
                let jsonToken = await Token(password, us.id);
                newTempUser.token = jsonToken.token;
                await newTempUser.save();
                if(jsonToken.success !== true) return res.status(401).send({success: false, message: 'Password in valid'});

                res.status(200).send(
                    {
                        success: true,
                        message: 'You have logged in successfully!',
                        token: jsonToken.token,
                        access_token: true
                    }
                )
            })
            .catch(e => {
                console.error("USER REGISTER", e)
                return res.status(401).send(e)
            })
    } catch (error) {
        console.log('REGISTER USER', error)
        return res.status(500).send({success: false, message: "server error"})
    }
})

router.get('/pass/phrase', async (req, res) => {
    let wallet = ethers.Wallet.createRandom();
    let Mnemonic_List = wallet.mnemonic
    return res.send({Mnemonic_List: Mnemonic_List});

})
module.exports = router