let mongoose = require('mongoose');
let Scehma = mongoose.Schema;

let Instagram = new Scehma({
    followerCount: {
        type: Number,
        
    },
    Username: {
        type: String
    }

})

let InstaAuth = mongoose.model("instagram", Instagram)
module.exports = InstaAuth