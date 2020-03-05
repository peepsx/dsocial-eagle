const express = require('express')
const router = express.Router()
let axios = require('axios');
let { InstaAuth } = require('../models/instagram')
let { TempInstagram } = require('../models/TempInstagram')
let { Access_Token } = require('../middleware/RSN_TRANSFER')

router.post('/instagram-details', [Access_Token], async (req, res)=>{
        
    let { username } = req.body;
        if(!username) {
            return res.status(400).send({
                success: false,
                message: "Fields are missing"
            })
        }
        if(username == undefined || username == null || typeof username === String) {
            return res.status(400).send({
                success: false,
                message: 'Fields are missing'
            })
        }
        let TempInsta = await TempInstagram.findOne({username: username});

        if(TempInsta) return res.status(200).send({
            success: false,
            message: 'Please try after one an hour!'
        })

        let instaUser = await InstaAuth.findOne({username: username});
            
        if(instaUser && instaUser !== null) {
            return res.status(200).send({
                success: false,
                message: 'You have already register with us!'
            })
        }

        try {
            let instagram = await axios.get(`https://www.instagram.com/${username}/?__a=1`)
            
            let newInsta = new TempInstagram({
                    instaid: instagram.data.graphql.user.id,
                    follower: instagram.data.graphql.user.edge_followed_by.count,
                    username: instagram.data.graphql.user.username
                })
                newInsta.save()
                    .then(insta => {
                        res.status(200).send({
                            success: true,
                            data:{name: username},
                            message: 'You have logged in successfully!'
                        })

                    })
                    .catch(err => {
                        return res.status(401).send({
                            success: false,
                            message: 'Something went wrong while saving User Data'
                        })
                    })

        } catch(error) {
            console.log("INSTAGRAM ERROR", error.message);

            if(error.message === 'Request failed with status code 404') return res.status(404).send({success: false, message: `Instagram user ${username} not found`});

            return res.status(500).send({
                success: false,
                message: 'Server Error!'
            })
        }
})


module.exports = router