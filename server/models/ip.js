let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ipSchema = new Schema({
    ip_address: {
        type: String,
        required: true,
        unique: true
    }
})

let Ip = mongoose.model('ip', ipSchema);

module.exports = {
    Ip
}