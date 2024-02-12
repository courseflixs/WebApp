const mongoose = require('mongoose');

const conn = mongoose.Collection;
const requestCourseSchema = new mongoose.Schema({
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
    default: '0',
  },

}, { timestamps: true });

const RequestCourse = mongoose.model('request_course', requestCourseSchema);
module.exports = RequestCourse;
