const mongoose = require("mongoose");
var conn = mongoose.Collection;
var requestCourseSchema = new mongoose.Schema({
    user_name: {
        type: String,
    },
    email: {
        type: String,
    },
    auther_name_of_course: {
        type: String,
    },
    ref_course_link: {
        type: String,
    },
    status: {
        type: String,
        default: '0'
    },


}, { timestamps: true });

var RequestCourse = mongoose.model('request_course', requestCourseSchema);
module.exports = RequestCourse;