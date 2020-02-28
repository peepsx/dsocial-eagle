let mongoose = require('mongoose');
var ttl = require('mongoose-ttl');

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
},{timestamps: true});

TempTwit.plugin(ttl, { ttl: 1 * 60 * 60 * 1000 });
let TempTwitter = mongoose.model('temptwitter', TempTwit);

module.exports = {
    TempTwitter
}