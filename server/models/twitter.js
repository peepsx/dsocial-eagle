const mongoose = require('mongoose')
const Schema = mongoose.Schema;



let Twitter = new Schema({
    username:{
        type:String,
        required:true
    },
    followerscount:{
        type:Number
    },
    profileDescription:{
        type:String
    }
})


let TwitterAuth = mongoose.model('twitter', Twitter)

module.exports = {TwitterAuth}


