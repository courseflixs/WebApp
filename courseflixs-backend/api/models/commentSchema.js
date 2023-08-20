const mongoose = require("mongoose");
var conn = mongoose.Collection;
var commentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    msg: {
        type: String,
    },
  
}, { timestamps: true });

var comment = mongoose.model('comment', commentSchema);
module.exports = comment;