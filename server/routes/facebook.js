require('dotenv').config();
var express = require('express');
var router = express.Router();
let axios = require('axios');
const { faceAuth } = require('../models/facebook');
const { TempFacebook } = require('../models/TempFacebook');
let generator = require('generate-password');
let bcrypt = require('bcryptjs');
let { Token } = require('../middleware/Token');

router.post('/facebook_detail', async (req, res)=>{
    var password = generator.generate({
        length: 10,
        numbers: true
    });

    try {
        let { fbPhoto,fbUserName, id, access_token } = req.body;
        let findOne = await faceAuth.findOne({facebookid: id})
        let TempFb = await TempFacebook.findOne({facebookid: id})

        if(TempFb) return res.status(200).send({
                success: false,
                message: 'Please try after one an hour'
            })
        
        if(findOne) return res.status(403).send({
                success: false,
                message: 'You have already register with us!'
            })
        
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        
        if(fbPhoto && fbUserName && id && access_token) {

                let valid = await axios.get(`https://graph.facebook.com/v3.3/${id}?fields=id,name&access_token=${access_token}`);

                if(valid.data.id !== id) return res.status(404).send({
                        success: false,
                        message: 'User not found'
                    })

                let newFbUser = new TempFacebook({
                    facebookid: id,
                    fbPhoto: fbPhoto,
                    fbUserName: fbUserName,
                })
                newFbUser.password = hash;
                newFbUser.save()
                    .then(async (us) => {
                        let jsonToken = await Token(password, us.id);
                        if(jsonToken.success !== true) return res.status(401).send({success: false, message: 'Password in valid'});

                        res.status(200).send(
                            {
                                success: true,
                                message: 'You have logged in successfully!',
                                token: jsonToken.token
                            }
                        )
                    })
                    .catch(e => {
                        console.error("USER FACEBOOK", e)
                        return res.status(401).send(e)
                    })
    
         }
         else {
            return res.status(400).send({
                 success: false, 
                 message: "Fields are missing"
             })
         }
    } catch(e) {
        console.log('FACEBOOK ERROR', e)
        return res.status(401).send({
            message: 'Something went wrong'
        })
    }
})

module.exports = router