var express = require('express');
var router = express.Router()
const {UserAuth} = require('../models/user')


router.post('/users-details', async(req,res, next)=>{
    let {useremail,ariser_username} = req.body
    console.log(req.body)
    let UserOne = await UserAuth.findOne({useremail: useremail, ariser_username: ariser_username})
    try {
        if(useremail && ariser_username && UserOne == null){
           let NewUser = new UserAuth({
               useremail:useremail,
               ariser_username:ariser_username
           })
            NewUser.save().
            then(()=>{
               res.status(200).send({
                   message:'User Login Suceesfully'
               })
            }) .catch(e => {
                console.log('Something went wrong')
            })
        } else {
            res.status(401).send({
                message:"Already Register"
            })
        }
    }
    catch(e){
        res.status(404).send({
            message: "Something went Wrong"
        })
    }




   
})


module.exports = router