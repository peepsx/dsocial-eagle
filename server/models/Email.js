let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EmailCode = new Schema({
    email:{
        type:String,
        unique: true,
        required:true,
    },
    token:{
      type:String,
      required:true
    },
    claimed:{
        type:Boolean,
        default:false
    }
}, {timestamps: true})

let EVerify = mongoose.model('verify', EmailCode);

module.exports = {
    EVerify
}