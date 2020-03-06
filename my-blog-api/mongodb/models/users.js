const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        set(val) {
            return bcrypt.hashSync(val, 10)
        }
    },
    email: {
        type: String,
        required: true
    }
})
const Users = mongoose.model("users", userSchema)
module.exports = Users