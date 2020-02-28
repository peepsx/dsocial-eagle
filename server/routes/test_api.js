let express  = require('express');
let { TempFacebook } = require('../models/TempFacebook');
let { TempGoogle } = require('../models/TempGoogle');
let { TempInstagram } = require('../models/TempInstagram');
let { TempTwitter } = require('../models/TempTwitter');

let router = express.Router();

router.get('/test-api', async (req, res) => {
    let findOne = await TempFacebook.findOne({fbUserName: 'jajshdjsd'});
    console.log('FINDONE', findOne)
    let newFace = new TempFacebook({
        facebookid: '12345678',
        fbPhoto: 'hhjdasdkskd',
        fbUserName: 'jajshdjsd',
        password: 'asdkjsakjdksd'
    })
    let newGoogle = new TempGoogle({
        GmailAddress: 'sbsashu143@gmail.com'
    })
    let newInstagram = new TempInstagram({
        id: 'assdsasd',
        follower: 12,
        username: 'Ashutosh'  
    })
    let newTwit = new TempTwitter({
        username: 'Ashutosh',
        followerscount: 12,
        profileDescription: 'Hello world',
    })
    await newTwit.save();
    await newInstagram.save();
    await newGoogle.save();
    await newFace.save();

    return res.status(200).send({
        message: 'Test-api running successfully',
        data: `newFace ${newFace}, newGoogle ${newGoogle} newInsta ${newInstagram} newTwit ${newTwit}`
    })
})

module.exports = router