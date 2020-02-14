var express = require('express');
var router = express.Router();
const { UserAuth } = require('../models/user');
var validator = require('validator');
let axios = require('axios');

router.post('/users-details', async (req, res, next) => {
    let { useremail, arisen_username } = req.body

    if(!useremail || !arisen_username) return res.status(400).send({success: false, message: 'Fields are missing!'})
    
    let ipAddress = await UserAuth.find({ ip_address: req.ip })
    // console.log('find ip adderess', ipAddress.length)
    if (!validator.isEmail(useremail)) {
        return res.status(400).json("Invalid Email id")
    }
    else if (arisen_username.length >= 12) {
        return res.status(400).json("Invalid Username")
    }
    else if (ipAddress.length) {
        return res.status(200).send({
            message: 'This ip-address has been used please change your ip first'
        })
    }

    let UserOne = await UserAuth.findOne({ useremail: useremail, arisen_username: arisen_username })
    try {
        axios.get(`https://nv6khovry9.execute-api.us-east-1.amazonaws.com/dev/lookup/${arisen_username}`)
            .then((lookup) => {
                console.log(lookup.data.details.account_name === arisen_username, useremail && arisen_username && UserOne == null)
                if(lookup.data.details.account_name === arisen_username) {
                    if (useremail && arisen_username && UserOne == null) {
                            let NewUser = new UserAuth({
                                useremail: useremail,
                                arisen_username: arisen_username,
                                ip_address: req.ip
                            })
                            NewUser.save()
                                .then(() => {
                                   return res.status(200).send({
                                            message: 'User Signup Successfully'
                                        })
                                }).catch(e => {
                                    return res.status(400).send({ message: 'Something went wrong' })
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