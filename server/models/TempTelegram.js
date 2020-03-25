let mongoose = require('mongoose');
let ttl = require('mongoose-ttl');

let Schema = mongoose.Schema;

let TempGram = new Schema({
        telegram_id: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true
        }
},{timestamps: true});

TempGram.plugin(ttl, {ttl: 1 * 60 * 50 * 100});
let TempTelegram = mongoose.model('temptelegram', TempGram);

module.exports = {
    TempTelegram
}