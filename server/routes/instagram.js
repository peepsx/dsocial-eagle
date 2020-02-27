const express = require('express')
const router = express.Router()
let axios = require('axios');
let { InstaAuth } = require('../models/instagram')
let { Access_Token } = require('../middleware/RSN_TRANSFER')
const Instagram = require('instagram-web-api');

router.post('/instagram-details',/**[Access_Token], */ async (req, res)=>{
        
    let { username, password } = req.body;
        if(!username && !password ) {
            return res.status(400).send({
                success: false,
                message: "Fields are missing"
            })
        }
        if(username == undefined || password == undefined || username == null || password == null ) {
            return res.status(400).send({
                success: false,
                message: 'Fields are missing'
            })
        }
        let instaUser = await InstaAuth.findOne({username: username});
            
        if(instaUser && instaUser !== null) {
            return res.status(403).send({
                success: false,
                nextstep: 'next',
                message: 'User already register please try with new user'
            })
        }

        try {
            const client = new Instagram({username, password});
            let login = await client.login();
            if(!login.authenticated) return res.status(404).json({success: false, message: 'Not a valid instagram user'});
            const followers = await client.getFollowers({ userId: login.userId })
            
            if(login.authenticated) {
                let newInsta = new InstaAuth({
                    id: login.userId,
                    follower: followers.count,
                    username: username
                })
                newInsta.save()
                    .then(insta => {
                        res.status(200).send({
                            success: true,
                            data:{name: username, pass: password},
                            message: 'Instagram saved successfully!'
                        })

                    })
                    .catch(err => {
                        return res.status(401).send({
                            success: false,
                            message: 'Something went wrong while saving User Data'
                        })
                    })
            } else {
                return res.status(401).send({
                    success:  false,
                    message: 'Something went wrong'
                })
            }

        } catch(e) {
            console.log("INSTAGRAM ERROR", e.message);
            if(e.message === 'Request failed with status code 404') return res.status(404).send({success: false, message: `Instagram user ${username} not found`});

            return res.status(500).send({
                success: false,
                message: 'Server Error!'
            })
        }
})


module.exports = router