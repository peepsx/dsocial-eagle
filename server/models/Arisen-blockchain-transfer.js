let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Arisen_Block_Transfer = new Schema({
    amount: {
        type: String,
    },
    account_from_transfer: {
        type: String
    },
    transaction_id: {
        type: String
    },
    transfer_to_user: {
        type: String
    }
})

let Arisen_Transfer = mongoose.model('arisen-block-chain', Arisen_Block_Transfer);

module.exports = {
    Arisen_Transfer
}