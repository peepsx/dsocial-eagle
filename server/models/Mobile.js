let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MobileCode = new Schema({
    mobile:{
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

let MVerify = mongoose.model('mobile_verifies', MobileCode);

module.exports = {
    MVerify
}