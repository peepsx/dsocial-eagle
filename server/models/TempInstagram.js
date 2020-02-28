let mongoose = require('mongoose');
var ttl = require('mongoose-ttl');
const getTime = () => new Date.getTime();
let Schema = mongoose.Schema;

let TempInsta = new Schema({
    id: {
        type: String
    },
    follower: {
        type: Number,
        
    },
    username: {
        type: String
    },
},{timestamps: true});

TempInsta.plugin(ttl, { ttl: 1 * 60 * 60 * 1000 });
let TempInstagram = mongoose.model('tempinstagram', TempInsta);

module.exports = {
    TempInstagram
}