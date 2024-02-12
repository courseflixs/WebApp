const express = require('express');

const router = express.Router();
const {
  retreiveRequestCourse, addRequestedCourse, updateRequestCourseStatus, addComment, getAllComment, deleteComment, deleteRequest,
} = require('../../controllers/userPanel/requestCourseController');

router.get('/get-request-course/:id?', retreiveRequestCourse);
router.post('/add-request-course', addRequestedCourse);
router.put('/update-req-course/:reqID', updateRequestCourseStatus);
router.delete('/delete-request/:reqID', deleteRequest);

router.post('/add-comment', addComment);
router.get('/get-comment', getAllComment);
router.delete('/delete-comment/:id', deleteComment);

module.exports = router;
