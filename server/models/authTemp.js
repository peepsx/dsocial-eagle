const mongoose = require('mongoose');
var ttl = require('mongoose-ttl');

const Schema = mongoose.Schema;

const authTemp = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    token: String
},{timestamps: true})

authTemp.plugin(ttl, { ttl: 1 * 60 * 60 * 1000 });
let userAuthTemp = mongoose.model('authTemp', authTemp);
module.exports = {
    userAuthTemp
}