let mongoose = require('mongoose');
let Scehma = mongoose.Schema;

let Facebook = new Scehma({
    facebookid: {
        type: String,
        required: true,
        unique: true
    },
    fbUserURL: {
        type: String
    },
    fbPhoto: {
        type: String,
    },
    fbUserName: {
        type: String,
        index: true
    },
    fbUserLocation: {
        type: String
    },
    follower: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

let faceAuth = mongoose.model("fbAuth", Facebook);

module.exports = { faceAuth };