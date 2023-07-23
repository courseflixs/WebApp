const express = require("express");
const router = express.Router();
var { retreiveRequestCourse, addRequestedCourse, updateRequestCourseStatus } = require('../../controllers/userPanel/requestCourseController');

router.get('/get-request-course/:id?', retreiveRequestCourse);
router.post('/add-request-course', addRequestedCourse);
router.put('/update-req-course/:reqID', updateRequestCourseStatus)



module.exports = router;