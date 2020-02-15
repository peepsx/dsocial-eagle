var express = require('express');
var router = express.Router();
const {faceAuth} = require('../models/facebook')

router.post('/facebook_detail',async (req,res,next)=>{
    console.log(req.body)
    try {
        let { fbUserURL, fbPhoto,fbUserName, fbUserLocation, id} = req.body;
        let findOne = await faceAuth.findOne({facebookid: id})

        if(findOne) return res.status(403).send({success: false, message: 'User already exists'})
        
        if(fbUserURL && fbPhoto && fbUserName && fbUserLocation && id) {
    
                let newFbUser = new faceAuth({
                    facebookid: id,
                    fbUserURL: fbUserURL,
                    fbPhoto: fbPhoto,
                    fbUserName: fbUserName,
                    fbUserLocation: fbUserLocation
                })
    
                newFbUser.save()
                    .then(() => {
                        res.status(200).send(
                            {
                                success: true,
                                message: 'Facebook details has been saved successfully'
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