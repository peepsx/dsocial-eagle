var express = require('express');
var router = express.Router();
const {faceAuth} = require('../models/facebook');
let generator = require('generate-password');
let bcrypt = require('bcryptjs');
let { Token } = require('../middleware/Token');

router.post('/facebook_detail',async (req, res)=>{
    var password = generator.generate({
        length: 10,
        numbers: true
    });

    try {
        let { fbUserURL, fbPhoto,fbUserName, fbUserLocation, id} = req.body;
        let findOne = await faceAuth.findOne({facebookid: id})

        if(findOne) return res.status(403).send({success: false, message: 'User already exists'})
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        
        if(fbUserURL && fbPhoto && fbUserName && fbUserLocation && id) {
                let newFbUser = new faceAuth({
                    facebookid: id,
                    fbUserURL: fbUserURL,
                    fbPhoto: fbPhoto,
                    fbUserName: fbUserName,
                    fbUserLocation: fbUserLocation,
                })
                newFbUser.password = hash;
                newFbUser.save()
                    .then(async (us) => {
                        let jsonToken = await Token(password, us.id);
                        if(jsonToken.success !== true) return res.status(401).send({success: false, message: 'Password in valid'});

                        res.status(200).send(
                            {
                                success: true,
                                message: 'Facebook details has been saved successfully',
                                token: jsonToken.token
                            }
                        )
                    })
                    .catch(e => {
                        console.error(e)
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