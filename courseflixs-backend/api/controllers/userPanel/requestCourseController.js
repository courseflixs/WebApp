const requestCourseSchema = require('../../models/requestCourseSchema')
//############################################################################################//
//<|========================= RequestCourse GET method code  ======================|>
//############################################################################################//
exports.retreiveRequestCourse = (req, res, next) => {
    //<|========================= Retreiving Single User Details Data ======================|>

    var userID = req.params.id;
    if (userID) {
        console.log("Single data cat")
        requestCourseSchema.findById(userID).then((data) => {
            res.status(200).send(data);
            console.log(data)
        }).catch((error) => {
            console.log(error);
        })
        //<|========================= Retreiving Single RequestCourse Details Data{END} ======================|>

    } else {
        //<|========================= Retreiving Total RequestCourse Details Data ======================|>

        requestCourseSchema.find().then((data) => {
            res.status(200).send(data);
        }).catch((error) => {
            console.log(error)
        });
    }
    //<|========================= Retreiving Single RequestCourse Details Data{END} ======================|>
}

//<|========================= Retreive RequestCourse Data {END}======================|>


//############################################################################################//
//<|========================= RequestCourse POST method code  ======================|>
//############################################################################################//
exports.addRequestedCourse = (req, res, next) => {
    const { userName, email, authorNameOfCourse, linkPageCourse } = req.body;
    var insertRequestCourseSchema = new requestCourseSchema({
        user_name: userName.trim(),
        email: email.trim(),
        auther_name_of_course: authorNameOfCourse.trim(),
        ref_course_link: linkPageCourse.trim()
    });

    insertRequestCourseSchema.save().then(() => {
        return res.status(200).send({ reqMsg: "Your request has been saved and you will get back shortly!!!" });
    });
}
//<|========================= inserting User Data {END}======================|>

exports.updateRequestCourseStatus = (req, res, next) => {
    const { reqID } = req.params;
    requestCourseSchema.findOneAndUpdate({ _id: reqID }, {
        status: '1'
    }).then((result) => {
        console.log(result);
        res.status(200).send({ reqMsg: "Requested course status has been changed successfully!!!" });
    })
}