const mongoose = require("mongoose");
var conn = mongoose.Collection;
var categorySchema = new mongoose.Schema({
    type_of_category: {
        type: String,
    },
    category_name: {
        type: String,
    }

}, { timestamps: true });

var category = mongoose.model('category', categorySchema);
module.exports = category;