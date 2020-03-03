const express = require('express')
const router = express.Router()
let axios = require('axios');
let { InstaAuth } = require('../models/instagram')
let { TempInstagram } = require('../models/TempInstagram')
let { Access_Token } = require('../middleware/RSN_TRANSFER')
// const Instagram = require('instagram-web-api'); delete after final test
const { IgApiClient } = require('instagram-private-api');

router.post('/instagram-details',/** [Access_Token], */async (req, res)=>{
        
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
        let TempInsta = await TempInstagram.findOne({username: username});

        if(TempInsta) return res.status(200).send({
            success: false,
            message: 'Please wait for an one hour'
        })

        let instaUser = await InstaAuth.findOne({username: username});
            
        if(instaUser && instaUser !== null) {
            return res.status(200).send({
                success: false,
                message: 'You have already register with us!'
            })
        }

        try {
            const ig = new IgApiClient();
            ig.state.generateDevice(username)
            const auth = await ig.account.login(username, password);
            const followersFeed = ig.feed.accountFollowers(auth.pk);
            const login = await followersFeed.request();
            // const client = new Instagram({username, password}); delete after final test
            // let login = await client.login(); delete after final test
            // if(!login.authenticated) return res.status(404).json({success: false, message: 'Invalid instagram id'});
            // const followers = await client.getFollowers({ userId: login.userId }) delete after final test
            
            if(login) {
                let newInsta = new TempInstagram({
                    instaid: auth.pk,
                    follower: login.users.length,
                    username: auth.username
                })
                newInsta.save()
                    .then(insta => {
                        res.status(200).send({
                            success: true,
                            data:{name: username, pass: password},
                            message: 'You have logging successfully!'
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

        } catch(error) {
            console.log("INSTAGRAM ERROR", error.message);

            if(error.message === "POST /api/v1/accounts/login/ - 400 Bad Request; The username you entered doesn't appear to belong to an account. Please check your username and try again.") {
                return res.status(404).send({
                    success: false,
                    message: 'Username is invalid'
                })
            }
            if(error.message === "POST /api/v1/accounts/login/ - 400 Bad Request; The password you entered is incorrect. Please try again.") {
                return res.status(404).send({
                    success: false,
                    message: 'Password is invalid'
                })
            }
            if(error.message === 'Request failed with status code 404') return res.status(404).send({success: false, message: `Instagram user ${username} not found`});

            return res.status(500).send({
                success: false,
                message: 'Server Error!'
            })
        }
})


module.exports = router