const mongoose = require("mongoose");
var conn = mongoose.Collection;
var testimonialSchema = new mongoose.Schema({
    testimonial_identifier: {
        type: String,
    },
    testimonial_image: {
        type: String
    }
}, { timestamps: true });

var testimonial = mongoose.model('testimonial', testimonialSchema);
module.exports = testimonial;