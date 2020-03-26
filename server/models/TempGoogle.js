let mongoose = require('mongoose');
var ttl = require('mongoose-ttl');

let Schema = mongoose.Schema;

let TempGo = new Schema({
    GmailAddress:{
        type:String
    },
},{timestamps: true});

TempGo.plugin(ttl, { ttl: 1 * 30 * 30 * 1000 });
let TempGoogle = mongoose.model('tempgoogle', TempGo);

module.exports = {
    TempGoogle
}