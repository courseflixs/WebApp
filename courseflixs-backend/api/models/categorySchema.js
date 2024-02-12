const mongoose = require('mongoose');

const conn = mongoose.Collection;
const categorySchema = new mongoose.Schema({
  type_of_category: {
    type: String,
  },
  category_name: {
    type: String,
  },
  qoute: {
    type: String,
  },
}, { timestamps: true });

const category = mongoose.model('category', categorySchema);
module.exports = category;
