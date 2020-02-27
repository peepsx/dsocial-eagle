let mongoose = require('mongoose');

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
    createdAt: {type: Date, expires: 5000}
});

let TempInstagram = mongoose.model('tempinstagram', TempInsta);

module.exports = {
    TempInstagram
}