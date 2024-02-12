const mongoose = require('mongoose');

const conn = mongoose.Collection;
const commentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  msg: {
    type: String,
  },

}, { timestamps: true });

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;
