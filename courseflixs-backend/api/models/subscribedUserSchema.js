const mongoose = require('mongoose');

const conn = mongoose.Collection;
const subscribedUserSchema = new mongoose.Schema({
  email: {
    type: String,
  },

}, { timestamps: true });

const SubscribedUser = mongoose.model('subscribed_user', subscribedUserSchema);
module.exports = SubscribedUser;
