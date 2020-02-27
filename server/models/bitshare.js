let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Bitshare = new Schema({
    arisen_username:{
        type:String,
        required:true,
    },
    bts_username:{
      type:String,
      required:true
    },
    transaction_id:{
        type:Number,
        required:true
    }
},{
    timestamps: true
})

let BitshareApi = mongoose.model("BitshareApi", Bitshare)

module.export = {
    BitshareApi
}
