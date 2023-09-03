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
   console.log(req.body)
   const { userName, regUserEmail, regUserPass } = req.body;
   // console.log(req.body)
   UserSchema.find({ email: regUserEmail }).then(async (result) => {
      // console.log(result.length)
      if (result.length > 0) {
         return res.status(200).send({ isAlreadyExist: true, userMsg: "This email already exists, please try with another email!!!" })
      } else {
         var insertUser = new UserSchema({
            name: userName.trim(),
            email: regUserEmail.trim(),
            password: await bcrypt.hash(regUserPass.trim(), 10),
         });
         insertUser.save().then(() => {
            const subscribeOptions = {
               from: 'helpdeskcourseflix@gmail.com',
               to: regUserEmail,
               subject: "Welcome to CourseFlix- Your Journey Begins Here!",
               // text: `Please click on the link below to reset your password: ${resetPasswordLink}`,
               html:`
               <html>
               <head>
               <style>
                  .email-heading{
                     padding:1rem;
                background-color: #dd3333;
                color:white;               
                  }
                  .email-details{
                     font-size:1.3rem;
                     line-height:2rem;
                     
                  }
                  .email-details span{
                     color:#dd3333;
                     font-weight:800;
                  }
                  
               </style>
               </head>
               <body>
                  <h1 class="email-heading">Welcome to CourseFlix- Your Journey Begins Here!</h1>
                  <div class="email-details">
                  <span>Dear ${userName},</span><br>
                  <p>We're absolutely thrilled to have you join our community. 🎉</p>
      
         <p>Here are the benefits you will have in our Family:-</p>
      
         <p>
         1. Exclusive Discount on Courses.<br>
      
         2. You will be provided Complimentary Courses Every Month.<br>
      
         3. Detailed Reviews on Courses will be provided <a href="https://docs.google.com/document/d/1SHa-101EudLdSJ5OJgsIsnz_eAFItf_lTHVl7w8KZ9s/edit">here</a>.<br>
      
         4. 24/7 Support-Do <a href="https://courseflix.io/#nine-step-section">Contact Us</a>,if you have any questions related to anything.
         </p>
         <p>Here’s your Complimentary Course for the Month:-</p>
         <p>If you have any questions, concerns, or ideas, don't hesitate to reach out to our support team at   <a href="mailto:courseflixs@gmail.com" target="_blank">(our support mail link)</a> We're here to assist you every step of the way.<p>
         <p>Once again, welcome to the CourseFlix family! We're excited to embark on this journey together.</p>
         <p><span>Best regards,<br>
      
      CourseFlix Team!</span></p>
                  </div>
               </body>
               </html>
      
               
               `
            };
            transporter.sendMail(subscribeOptions, (error, info) => {
               if (error) {
                  console.error('Error sending reset contact email:', error);
               } else {
                  console.log('contat details email:', info.response);
               }
            });
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

exports.sendContactEmail=(req,res,next)=>{
   const {name,email,contact,msg}=req.body;
   console.log(req.body)
   const contactOptions = {
      from: 'courseflixs@gmail.com',
      to: 'helpdeskcourseflix@gmail.com',
      subject: 'Query asked from the '+name,
      // text: `Please click on the link below to reset your password: ${resetPasswordLink}`,
      html:`<html>
      <body>
         <h1>Query asked from the ${name}</h1>
         <h3>Email: ${email}</h3>
         <h3>Contact: ${contact}</h3>
         <h3><b>Query asked by user:</b><br><br>${msg}</h3>
      </body>
      </html>
      
      `
   };

 // Send the email
 transporter.sendMail(contactOptions, (error, info) => {
   if (error) {
      console.error('Error sending reset contact email:', error);
      res.status(500).json({status:'Error', message: 'Error while sending contact email please try again' });
   } else {
      console.log('contat details email:', info.response);
      res.status(200).json({status:'Succ', message: 'Your query has been sent successfully' });
   }
});
}