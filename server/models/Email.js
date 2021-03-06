let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EmailCode = new Schema({
    email:{
        type:String,
        unique: true,
        required:true,
    },
    username: {
        type:String,
        required: true,
        unique: true
    },
    token:{
      type:String,
      required:true
    },
    claimed:{
        type:Boolean,
        default:false
    },
    tokenverified:{
        type:Boolean,
        default:false
    },
    count:{
        type:Number,
        default:0
    }
}, {timestamps: true})

let EVerify = mongoose.model('email_verifies', EmailCode);

module.exports = {
    EVerify
}