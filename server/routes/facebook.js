var express = require('express');
var router = express.Router();
const {faceAuth} = require('../models/facebook')

router.post('/facebook_detail',async (req,res,next)=>{
    console.log(req.body)
    let { fbUserURL, fbPhoto,fbUserName, fbUserLocation} = req.body;
    let findOne = await faceAuth.findOne({fbUserName: fbUserName})

     if(fbUserURL && fbPhoto && fbUserName && fbUserLocation && !findOne ==null ) {

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
         res.status(404).send({
             message: "Already Reigster"
         })
     }
})

module.exports = router