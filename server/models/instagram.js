let mongoose = require('mongoose');
let Scehma = mongoose.Schema;

let Instagram = new Scehma({
    folower: {
        type: Number,
        
    },
    username: {
        type: String
    }

})

let InstaAuth = mongoose.model("instagram", Instagram)
module.exports = {
    InstaAuth
}