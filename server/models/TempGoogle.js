let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let TempGo = new Schema({
    GmailAddress:{
        type:String
    },
    createdAt: {type: Date, expires: 5000}
});

let TempGoogle = mongoose.model('tempgoogle', TempGo);

module.exports = {
    TempGoogle
}