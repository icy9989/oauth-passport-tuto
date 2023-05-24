const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    authenticationId: String,
    image: String
})

module.exports = mongoose.model("user", UserSchema);