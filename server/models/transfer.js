let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let RSN = new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
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
    }
}, {
    timestamps: true
})

let Rsn_Transfer = mongoose.model('rsntransfer', RSN)

module.exports = {
    Rsn_Transfer
}