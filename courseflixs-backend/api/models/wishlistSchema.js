const mongoose = require("mongoose");
var conn = mongoose.Collection;
var wishlistSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "endUserSchema",
    },
    proID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "productDetailsSchema",
    }

}, { timestamps: true });

var wishlist = mongoose.model('wishlist', wishlistSchema);
module.exports = wishlist;