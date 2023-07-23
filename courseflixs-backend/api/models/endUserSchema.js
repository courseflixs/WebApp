const mongoose = require("mongoose");
var conn = mongoose.Collection;
var endUsersSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    token:{
        type:String
    }

}, { timestamps: true });

var endUsers = mongoose.model('end_users', endUsersSchema);
module.exports = endUsers;