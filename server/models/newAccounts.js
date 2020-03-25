const mongoose = require('mongoose');

const newAccountSchema = mongoose.Schema;


const newAccount = new newAccountSchema({
    main_user: {
        type: String,
        unique: true,
        required: true,
    },
    new_user: {
        type: String,
        unique: true,
        required: true,
    },
    owner_pub_key: {
        type: String,
        unique: true,
        required: true
    },
    active_pub_key: {
        type: String,
        unique: true,
        required: true
    },
    owner_private_key: {
        type: String,
        unique: true,
        required: true
    },
    active_private_key: {
        type: String,
        unique: true,
        required: true
    }
})

const Account = mongoose.model('rsn-account', newAccount);

module.exports = {
    Account
}

