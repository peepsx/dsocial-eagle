const mongoose = require('mongoose')
const Schema = mongoose.Schema;



let Twitter = new Schema({
    username:{
        type:String,
    },
    followerscount:{
        type:Number
    },
    profileDescription:{
        type:String
    },
    follower: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


let TwitterAuth = mongoose.model('twitter', Twitter)

module.exports = {TwitterAuth}


