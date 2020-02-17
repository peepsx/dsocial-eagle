var express = require('express');
var router = express.Router();
const { UserAuth } = require('../models/user');
var validator = require('validator');
let axios = require('axios');
let { RSN_TRANSFER } = require('../middleware/RSN_TRANSFER'); 
let { Rsn_Transfer } = require('../Transfer/Rsn_Transfer')

router.post('/users-details', [RSN_TRANSFER] , async (req, res) => {

    let { email, arisen_username, ip } = req.body
    let UserOne = await UserAuth.findOne({ email: email, arisen_username: arisen_username })
    if(!email || !arisen_username || !ip || ip == undefined) return res.status(400).send({success: false, message: 'Fields are missing!'})
    
    let ipAddress = await UserAuth.find({ ip_address: ip.v4 === ip.v6 ? ip.v4 : ip.v6})

    if (!validator.isEmail(email)) {
        return res.status(400).json("Invalid Email id")
    }
    else if (UserOne) {
        return res.status(403).json("User already exists!")
    }
    else if (ipAddress[0]) {
        return res.status(403).send({
            success: false,
            message: 'This ip-address has been used please change your ip first'
        })
    }

    try {
        axios.get(`https://nv6khovry9.execute-api.us-east-1.amazonaws.com/dev/lookup/${arisen_username}`)
            .then(async (lookup) => {

                if(lookup.data.details.account_name === arisen_username) {
                    if (email && arisen_username && UserOne == null) {
                            let NewUser = new UserAuth({
                                email: email,
                                arisen_username: arisen_username,
                                ip_address: ip.v4 === ip.v6 ? ip.v4 : ip.v6
                            })
                           let user = await NewUser.save();

                           Rsn_Transfer(arisen_username, user.id)
                                    .then(TRANSFER => {
                                        if(TRANSFER.success) {
                                            return res.status(200).send({
                                                success: true,
                                                message: TRANSFER.message
                                            })
                                        }
                                    })
                                    .catch(e => {
                                        console.log("USER SAVED BUT RSN DID NOT TRANSFER", e)
                                        return res.status(500).send({
                                            message: "Server error"
                                        })
                                    })
                    } else {
                        res.status(401).send({
                            message: "Already Register"
                        })
                    }
                }
            })
            .catch((e) => {
                return res.status(404).send({
                    success: false,
                    message: 'User not found'
                })
            })
    }
    catch (e) {
       return res.status(404).send({
                message: "User not found"
            })
    }
})


module.exports = router