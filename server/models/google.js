let mongoose = require('mongoose');
let Scehma = mongoose.Schema;



let Google = new Scehma({
    GmailAddress:{
        type:String
    }
}, {
    timestamps: true
})


let googleAuth = mongoose.model("google", Google);

module.exports = { googleAuth };