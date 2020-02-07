var express = require('express');
var router = express.Router();
const FB = require('../models/facebook')


// router.post('/', (req, res, next) => {
//     let data = req.body
//     console.log('data from front', data);
//     res.json([
//         { status: 'succesfully recieved' }
//     ])
// })

router.post('/fb',async (req,res,next)=>{
    console.log(req.body)
    let { fbUserURL, fbPhoto,fbUserName, fbUserLocation} = req.body;
    let findOne = await FB.findOne({fbUserName: fbUserName})

     if(fbUserURL && fbPhoto && fbUserName && fbUserLocation && !findOne ) {

            let newFbUser = new FB({
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