const UserSchema = require('../../models/endUserSchema')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   secure: false,
   auth: {
     user: process.env.EMAIL_USERNAME,
     pass: process.env.EMAIL_PASSWORD
   }
 });
//############################################################################################//
//<|========================= User GET method code  ======================|>
//############################################################################################//
exports.retreiveUser = (req, res, next) => {

   const { loginUserEmail, loginUserPass } = req.body;
   UserSchema.find({ email: loginUserEmail }).then(async (data) => {
      // console.log(data);
      if (data.length > 0 && await bcrypt.compare(loginUserPass, data[0].password)) {
         res.status(200).send(data);
      }
      else {
         res.status(200).send({ userMsg: "Invalid Username/Password" })
      }
   }).catch((error) => {
      console.log(error);
   })


}

//<|========================= Retreive User Data {END}======================|>


//############################################################################################//
//<|========================= User POST method code  ======================|>
//############################################################################################//
exports.addUser = (req, res, next) => {
   const { userName, regUserEmail, regUserPass } = req.body;
   // console.log(req.body)
   UserSchema.find({ email: regUserEmail }).then(async (result) => {
      // console.log(result.length)
      if (result.length > 0) {
         return res.status(200).send({ isAlreadyExist: true, userMsg: "This user is already exist please try another one!!!" })
      } else {
         var insertUser = new UserSchema({
            name: userName.trim(),
            email: regUserEmail.trim(),
            password: await bcrypt.hash(regUserPass.trim(), 10),
         });
         insertUser.save().then(() => {
            return res.status(200).send({ isAlreadyExist: false, userMsg: "User Registered Successfully!!!" });
         });
      }
   })

}
//<|========================= inserting User Data {END}======================|>


//############################################################################################//
//<|========================= User GET method code  ======================|>
//############################################################################################//
exports.getAllCustomer = (req, res, next) => {
   UserSchema.find().then(async (result) => {
      res.status(200).send(result)
   })

}
//<|========================= inserting User Data {END}======================|>

exports.forgotPassword = (req, res, next) => {
   const { forgotUserEmail } = req.body;
   UserSchema.find({ email: forgotUserEmail }).then(async (result) => {
      // console.log(result);
      if (result) {
         const resetToken = crypto.randomBytes(32).toString("hex");
         const resetPasswordLink = `${process.env.API_URL}/reset-password/${resetToken}`;
         await UserSchema.findByIdAndUpdate(result[0]._id, { token: resetToken });

         const mailOptions = {
            from: 'courseflixs@gmail.com',
            to: forgotUserEmail,
            subject: 'Reset Your Password',
            text: `Please click on the link below to reset your password: ${resetPasswordLink}`
         };

         // Send the email
         transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
               console.error('Error sending reset password email:', error);
               res.status(500).json({status:'Error', message: 'Error sending reset password email' });
            } else {
               console.log('Reset password email sent successfully:', info.response);
               res.status(200).json({status:'Succ', message: 'Reset password email sent successfully' });
            }
         });
      } else {
         res.status(200).json({status:'Error', message: 'You have provided wrong email!!!' })
      }

   })
}

exports.resetPassword = (req, res, next) => {
const {newPassword,token}=req.body;
console.log("from reset password")
console.log(req.body);
UserSchema.findOne({token:token}).then(async(result)=>{
   if(result){
      console.log(result)
     await UserSchema.findByIdAndUpdate(result._id,{password:await bcrypt.hash(newPassword.trim(), 10)});
      res.status(200).json({status:'Succ', message: 'Your Password has been reset successfully!!!' });

   }else{
      res.status(200).json({status:'Error', message: 'Your Password has not been reset please try once again!!!' });

   }
})
}