const mongoose = require('mongoose');
const Scehma = mongoose.Schema;


let User = new Scehma({
    useremail:{
        type:String,
        required: true
    },
    ariser_username:{
        type:String,
        required: true
    },
    ip_address:{
        type:String
    }
})


let UserAuth = mongoose.model("user" , User)

module.exports = {UserAuth}

// let googleAuth = mongoose.model("google", Google);

// module.exports = { googleAuth };