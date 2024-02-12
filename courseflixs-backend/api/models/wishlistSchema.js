const mongoose = require('mongoose');

const conn = mongoose.Collection;
const wishlistSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'endUserSchema',
  },
  proID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productDetailsSchema',
  },

}, { timestamps: true });

const wishlist = mongoose.model('wishlist', wishlistSchema);
module.exports = wishlist;
