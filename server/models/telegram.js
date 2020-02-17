let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TeleGram = new Schema({
        telegram_id: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true
        }
},{timestamps: true})

let  TelegramDetail = mongoose.model('telegram', TeleGram);

module.exports = {
    TelegramDetail
}