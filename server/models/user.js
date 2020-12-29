const mongoose = require('mongoose');
const Scehma = mongoose.Schema;


let User = new Scehma({
    arisen_username:{
        type:String,
        required: true
    },
    amount: {
        type: String,
    },
    account_from_transfer: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    },
    claimed:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})


let UserAuth = mongoose.model("user" , User)

module.exports = {UserAuth}

// let googleAuth = mongoose.model("google", Google);

// module.exports = { googleAuth };