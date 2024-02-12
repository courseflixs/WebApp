const requestCourseSchema = require('../../models/requestCourseSchema');
const commentSchema = require('../../models/commentSchema');
// ############################################################################################//
// <|========================= RequestCourse GET method code  ======================|>
// ############################################################################################//
exports.retreiveRequestCourse = (req, res, next) => {
  // <|========================= Retreiving Single User Details Data ======================|>

  const userID = req.params.id;
  if (userID) {
    console.log('Single data cat');
    requestCourseSchema.findById(userID).then((data) => {
      res.status(200).send(data);
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
    // <|========================= Retreiving Single RequestCourse Details Data{END} ======================|>
  } else {
    // <|========================= Retreiving Total RequestCourse Details Data ======================|>

    requestCourseSchema.find().then((data) => {
      res.status(200).send(data);
    }).catch((error) => {
      console.log(error);
    });
  }
  // <|========================= Retreiving Single RequestCourse Details Data{END} ======================|>
};

// <|========================= Retreive RequestCourse Data {END}======================|>

// ############################################################################################//
// <|========================= RequestCourse POST method code  ======================|>
// ############################################################################################//
exports.addRequestedCourse = (req, res, next) => {
  const {
    userName, email, authorNameOfCourse, linkPageCourse,
  } = req.body;
  const insertRequestCourseSchema = new requestCourseSchema({
    user_name: userName.trim(),
    email: email.trim(),
    auther_name_of_course: authorNameOfCourse.trim(),
    ref_course_link: linkPageCourse.trim(),
  });

  insertRequestCourseSchema.save().then(() => res.status(200).send({ reqMsg: 'Your request has been saved and you will get back shortly!!!' }));
};
// <|========================= inserting User Data {END}======================|>

exports.updateRequestCourseStatus = (req, res, next) => {
  const { reqID } = req.params;
  requestCourseSchema.findOneAndUpdate({ _id: reqID }, {
    status: '1',
  }).then((result) => {
    console.log(result);
    res.status(200).send({ reqMsg: 'Requested course status has been changed successfully!!!' });
  });
};
exports.deleteRequest = (req, res, next) => {
  const id = req.params.reqID;
  const findingAndDeletingComment = requestCourseSchema.findOneAndDelete({ _id: id });
  findingAndDeletingComment.exec().then((deleteData) => {
    res.status(200).send({ status: 'succ', message: 'Request deleted Successfully!!!' });
  });
};
exports.addComment = (req, res, next) => {
  const { name, msg } = req.body;
  const addCommentData = new commentSchema({
    name: name.trim(),
    msg: msg.trim(),
  });

  addCommentData.save().then(() => res.status(200).send({ status: 'succ', message: 'Your comment has been saved and displayed on the page' }));
};

exports.getAllComment = (req, res, next) => {
  commentSchema.find().then((data) => {
    res.status(200).send(data);
  }).catch((error) => {
    console.log(error);
  });
};

exports.deleteComment = (req, res, next) => {
  const { id } = req.params;
  const findingAndDeletingComment = commentSchema.findOneAndDelete({ _id: id });
  findingAndDeletingComment.exec().then((deleteData) => {
    res.status(200).send({ status: 'succ', message: 'Comment deleted Successfully!!!' });
  });
};
