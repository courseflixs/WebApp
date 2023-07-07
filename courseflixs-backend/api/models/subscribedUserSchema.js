const mongoose = require("mongoose");
var conn = mongoose.Collection;
var subscribedUserSchema = new mongoose.Schema({
    email: {
        type: String,
    }

}, { timestamps: true });

var SubscribedUser = mongoose.model('subscribed_user', subscribedUserSchema);
module.exports = SubscribedUser;