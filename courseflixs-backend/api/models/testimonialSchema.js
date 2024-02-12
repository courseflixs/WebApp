const mongoose = require('mongoose');

const conn = mongoose.Collection;
const testimonialSchema = new mongoose.Schema({
  testimonial_identifier: {
    type: String,
  },
  testimonial_image: {
    type: String,
  },
}, { timestamps: true });

const testimonial = mongoose.model('testimonial', testimonialSchema);
module.exports = testimonial;
