let mongoose = require('mongoose');
let Scehma = mongoose.Schema;



let Google = new Scehma({
    GmailAddress:{
        type:String
    },
    amount: {
        type:Number,
        default: 100
    }
}, {
    timestamps: true
})


let googleAuth = mongoose.model("google", Google);

module.exports = { googleAuth };