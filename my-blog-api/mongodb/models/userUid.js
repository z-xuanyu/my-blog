const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userUidSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    url: {
        type: String
    },
    qq: {
        type: String
    },
    avatar:{
        type:String
    }
},{
    timestamps: true
  })
module.exports = mongoose.model("userUid",userUidSchema)