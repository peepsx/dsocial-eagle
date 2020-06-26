const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auth = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    }
},{timestamps: true})

let userAuth = mongoose.model('auths', auth);
module.exports = {
    userAuth
}