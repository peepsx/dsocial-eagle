let mongoose = require('mongoose');
let Scehma = mongoose.Schema;

let Instagram = new Scehma({
    id: {
        type: String
    },
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