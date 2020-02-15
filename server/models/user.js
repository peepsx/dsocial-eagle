const mongoose = require('mongoose');
const Scehma = mongoose.Schema;


let User = new Scehma({
    email:{
        type:String,
        required: true
    },
    arisen_username:{
        type:String,
        required: true
    },
    ip_address:{
        type: String
    }
}, {
    timestamps: true
})


let UserAuth = mongoose.model("user" , User)

module.exports = {UserAuth}

// let googleAuth = mongoose.model("google", Google);

// module.exports = { googleAuth };