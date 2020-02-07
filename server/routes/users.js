var express = require('express');
var router = express.Router()
const { UserAuth } = require('../models/user')
var validator = require('validator')

router.post('/users-details', async (req, res, next) => {
    let { useremail, ariser_username } = req.body
    // console.log(req.body, 'ipAdderess', req.ip)

    let ipAddress = await UserAuth.find({ ip_address: req.ip })
    // console.log('find ip adderess', ipAddress.length)
    if (!validator.isEmail(useremail)) {
        return res.status(400).json("Invalid Email id")
    }
    else if (ariser_username.length >= 12) {
        return res.status(400).json("Invalid Username")
    }
    else if (ipAddress.length) {
        return res.status(200).send({
            message: 'This ip-address has been used please change your ip first'
        })
    }
    let UserOne = await UserAuth.findOne({ useremail: useremail, ariser_username: ariser_username })
    try {
        if (useremail && ariser_username && UserOne == null) {
            let NewUser = new UserAuth({
                useremail: useremail,
                ariser_username: ariser_username,
                ip_address: req.ip
            })
            NewUser.save().
                then(() => {
                    res.status(200).send({
                        message: 'User Signup Suceesfully'
                    })
                }).catch(e => {
                    res.status(400).send({ message: 'Something went wrong' })
                })
        } else {
            res.status(401).send({
                message: "Already Register"
            })
        }
    }
    catch (e) {
        res.status(404).send({
            message: "Something went Wrong"
        })
    }





})


module.exports = router