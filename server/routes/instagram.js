const express = require('express')
const router = express.Router()
let axios = require('axios');
let { InstaAuth } = require('../models/instagram')
let { Access_Token } = require('../middleware/RSN_TRANSFER')

router.post('/instagram-details', [Access_Token], async (req,res)=>{
        let { username, id } = req.body;

        if(!username && !id ) {
            return res.status(400).send({
                success: false,
                message: "Fields are missing"
            })
        }
        if(username == undefined || id == undefined || username == null || id == null ) {
            return res.status(400).send({
                success: false,
                message: 'Fields are missing'
            })
        }

        try {
            let detail = await axios.get(`https://www.instagram.com/${username}/?__a=1`)
            let instaUser = await InstaAuth.findOne({username: username});
            
            if(instaUser && instaUser !== null) {
                return res.status(403).send({
                    success: false,
                    nextstep: 'next',
                    message: 'User already register please try with new user'
                })
            }
            console.log('jajsjsjj', detail.data.graphql.user.edge_followed_by.count)
            if(detail && instaUser == null && detail.data !== undefined && detail.data !== null) {
                let newInsta = new InstaAuth({
                    id: id,
                    folower: detail.data.graphql.user.edge_followed_by.count,
                    username: username
                })
                newInsta.save()
                    .then(insta => {
                        res.status(200).send({
                            success: true,
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
            console.log(e.message);
            if(e.message === 'Request failed with status code 404') return res.status(404).send({success: false, message: `Instagram user ${username} not found`});

            return res.status(500).send({
                success: false,
                message: 'Server Error!'
            })
        }
})


module.exports = router