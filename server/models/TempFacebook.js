let mongoose = require('mongoose');
var ttl = require('mongoose-ttl');

let Schema = mongoose.Schema;

let TempFace = new Schema({
    facebookid: {
        type: String,
        required: true,
        unique: true
    },
    fbPhoto: {
        type: String,
    },
    fbUserName: {
        type: String,
        index: true
    },
    follower: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
},{timestamps: true});

TempFace.plugin(ttl, { ttl: 1 * 60 * 50 * 100 });
let TempFacebook = mongoose.model('tempfacebook', TempFace);

module.exports = {
    TempFacebook
}