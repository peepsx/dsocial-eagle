let mongoose = require('mongoose');
var ttl = require('mongoose-ttl');
const getTime = () => new Date.getTime();
let Schema = mongoose.Schema;

let TempInsta = new Schema({
    instaid: {
        type: String
    },
    follower: {
        type: Number,
        
    },
    username: {
        type: String
    },
},{timestamps: true});

TempInsta.plugin(ttl, { ttl: 1 * 60 * 50 * 100 });
let TempInstagram = mongoose.model('tempinstagram', TempInsta);

module.exports = {
    TempInstagram
}