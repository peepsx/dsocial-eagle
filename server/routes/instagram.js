const express = require('express')
const router = express.Router()
let { InstaAuth } = require('../models/instagram')

router.post('/instagram-details',async (req,res)=>{
        let { username } = req.body;
        console.log('instausernae', username)
        // if(!count || !username || count == undefined || username || undefined || count == null || username || null && id) {
        //     return res.status(200).send({
        //         success: false,
        //         message: "Fields are missing"
        //     })
        // }
        // try {
        //     let instaUser = await InstaAuth.findOne({username: username});
        //     if(instaUser && instaUser == null) {
        //         let newInsta = new InstaAuth({
        //             follow: count,
        //             username: username
        //         })
        //         newInsta.save()
        //             .then(insta => {
        //                 res.status(200).send({
        //                     success: true,
        //                     message: 'Instagram saved successfully!'
        //                 })

        //             })
        //             .catch(err => {
        //                 return res.status(200).send({
        //                     success: false,
        //                     message: 'Something went wrong while saving User Data'
        //                 })
        //             })
        //     }
        // } catch(e) {
        //     console.log(e);
        //     return res.status(401).send({
        //         success: false,
        //         message: 'Something went wrong!'
        //     })
        // }
})


module.exports = router