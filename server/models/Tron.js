let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TronHistory = new Schema({
    tron_address: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    trx_id: {
        type: String,
        required: true
    },
    arisen_user: {
        type: String,
        required: true
    },
    arisen_new_user: {
        type: String,
        required: true
    },
    transfer_amount: {
        type: String,
        required: true
    }
}, {timestamps: true})

let Tron = mongoose.model('trontransfer', TronHistory);

module.exports = {
    Tron
}