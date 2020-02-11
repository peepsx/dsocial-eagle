var express = require('express');
var router = express.Router();
const {faceAuth} = require('../models/facebook')

router.post('/facebook_detail',async (req,res,next)=>{
    console.log(req.body)
    try {
        let { fbUserURL, fbPhoto,fbUserName, fbUserLocation} = req.body;
        let findOne = await faceAuth.findOne({fbUserName: fbUserName})
    
         if(fbUserURL && fbPhoto && fbUserName && fbUserLocation && findOne == null ) {
    
                let newFbUser = new faceAuth({
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
                                message: 'Sucessfully saved'
                            }
                        )
                    })
                    .catch(e => {
                        console.error(e)
                        return res.status(401).send(e)
                    })
    
         }
         else {
            return res.status(200).send({
                 success: false, 
                 message: "Already Reigster"
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