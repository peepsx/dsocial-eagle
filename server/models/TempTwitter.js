let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let TempTwit = new Schema({
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
    },
    createdAt: {type: Date, expires: 5000}
});

let TempTwitter = mongoose.model('temptwitter', TempTwit);

module.exports = {
    TempTwitter
}