const mongoose = require('mongoose');
const Scehma = mongoose.Schema;


let User = new Scehma({
    arisen_username:{
        type:String,
        required: true
    },
    ip_address:{
        type: [String],
        required: true,
        unique: true
    }
}, {
    timestamps: true
})


let UserAuth = mongoose.model("user" , User)

module.exports = {UserAuth}

// let googleAuth = mongoose.model("google", Google);

// module.exports = { googleAuth };