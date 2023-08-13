const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userId: Number,
    email: String, 
    friends: [Number]
    
});

module.exports = mongoose.model("Users", UserSchema);