const mongoose = require('mongoose');

const conn = mongoose.Collection;
const endUsersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },

}, { timestamps: true });

const endUsers = mongoose.model('end_users', endUsersSchema);
module.exports = endUsers;
