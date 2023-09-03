const subscribedUserSchema = require('../../models/subscribedUserSchema')
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
exports.retreiveSubsUser = (req, res, next) => {
   //<|========================= Retreiving Single User Details Data ======================|>

    var userID=req.params.id;
    if(userID){
      console.log("Single data cat")
      subscribedUserSchema.findById(userID).then((data)=>{
         res.status(200).send(data);
         console.log(data)
        }).catch((error)=>{
         console.log(error);
        })
   //<|========================= Retreiving Single User Details Data{END} ======================|>

    }else{
   //<|========================= Retreiving Total User Details Data ======================|>

   subscribedUserSchema.find().then((data) => {
      res.status(200).send(data);
   }).catch((error) => {
      console.log(error)
   });
    }
   //<|========================= Retreiving Single User Details Data{END} ======================|>
}

//<|========================= Retreive User Data {END}======================|>


//############################################################################################//
//<|========================= User POST method code  ======================|>
//############################################################################################//
exports.addSubsUser = (req, res, next) => {
   const { email } = req.body;
   console.log(req.body)
   var insertUser = new subscribedUserSchema({
    email: email.trim(),
   });

   insertUser.save().then(() => {
      const subscribeOptions = {
         from: 'helpdeskcourseflix@gmail.com',
         to: email,
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
            <span>Dear Sir,</span><br>
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
      return res.status(200).send({ userMsg: "Subscribed newsletter Successfully!!!" });
   });
}
//<|========================= inserting User Data {END}======================|>

