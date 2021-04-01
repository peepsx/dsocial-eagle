let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let RSN = new Schema({
    user: {
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

let Rsn_Transfers = mongoose.model('rsntransfers', RSN)

module.exports = {
    Rsn_Transfers
}