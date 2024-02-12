const mongoose = require('mongoose');

const conn = mongoose.Collection;
const blogSchema = new mongoose.Schema({
  blog_image: {
    type: String,
  },
  visiblity: {
    type: String,
  },
  blog_name: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  tags: [{
    type: String,
  }],

}, { timestamps: true });

const blogs = mongoose.model('blog_schema', blogSchema);
module.exports = blogs;
