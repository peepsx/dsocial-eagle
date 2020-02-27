let mongoose = require('mongoose');

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
    createdAt: {type: Date, expires: 5000}
});

let TempFacebook = mongoose.model('tempfacebook', TempFace);

module.exports = {
    TempFacebook
}