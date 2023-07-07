const testimonialSchema = require('../../models/testimonialSchema')
const fs=require('fs')

//############################################################################################//
//<|========================= Testimonial GET method code  ======================|>
//############################################################################################//
exports.retreiveTestimonial = (req, res, next) => {
   //<|========================= Retreiving Single Testimonial Details Data ======================|>

    var testimonialID=req.params.id;
    if(testimonialID){
      console.log("Single data cat")
      testimonialSchema.findById(testimonialID).then((data)=>{
         res.status(200).send(data);
         // console.log(data)
        }).catch((error)=>{
         console.log(error);
        })
   //<|========================= Retreiving Single Testimonial Details Data{END} ======================|>

    }else{
   //<|========================= Retreiving Total Testimonial Details Data ======================|>

   testimonialSchema.find().then((data) => {
      res.status(200).send(data);
   }).catch((error) => {
      console.log(error)
   });
    }
   //<|========================= Retreiving Single Testimonial Details Data{END} ======================|>
}

//<|========================= Retreive Testimonial Data {END}======================|>


//############################################################################################//
//<|========================= Testimonial POST method code  ======================|>
//############################################################################################//
exports.addTestimonial = (req, res, next) => {
   const { testimonialName } = req.body;
   const {testimonialImage}=req.files;
   var insertTestimonial = new testimonialSchema({
    testimonial_image:testimonialImage[0].filename,
    testimonial_identifier:testimonialName.trim(),
   });
   console.log("request reached")

   insertTestimonial.save().then(() => {
      return res.status(200).send({ testimonialMsg: "Testimonial details Inserted Successfully!!!" });
   });
}
//<|========================= inserting Testimonial Data {END}======================|>

//############################################################################################//
//<|========================= Testimonial PUT method code ======================|>
//############################################################################################//
exports.updatingTestimonial = (req, res, next) => {
   //<|========================= Updating particular Testimonial by its id ======================|>
   console.log("updating project");
   const { testimonialName,updatedTestimonialImg } = req.body;
   const {testimonialImage}=req.files;
     var id = req.params.id

   var findingAndUpdatingTestimonial = testimonialSchema.findOneAndUpdate({ _id: id }, {
    testimonial_image:testimonialImage?testimonialImage[0].filename:updatedTestimonialImg,
    testimonial_identifier:testimonialName.trim(),
   });
   findingAndUpdatingTestimonial.exec().then((singleData) => {
      console.log(singleData)
      res.status(200).send({ testimonialMsg: "Testimonial details Updated Successfully!!!" });
   }).catch((error) => {

   });

   //<|========================= Updating particular Testimonial by its id {END}======================|>
}


//############################################################################################//
//<|========================= Testimonial PUT method code{END} ======================|>
//############################################################################################//


//   /############################################################################################//
//<|========================= Testimonial DELETE method code  ======================|>
//############################################################################################//
exports.deletingTestimonial = (req, res, next) => {
   //<|========================= Deleting Testimonial by its id ======================|>
   var id = req.params.id

   testimonialSchema.findById(id).then((data)=>{
      var findingAndDeletingPro = testimonialSchema.findOneAndDelete({ _id: id });
      findingAndDeletingPro.exec().then((deleteData) => { 
      fs.unlinkSync('./public/images/testimonial/'+data.testimonial_image, (error) => {
        if (error) {
          console.log(error);
        }
      });
      res.status(200).send({ TestimonialMsg: "Testimonial details deleted Successfully!!!" });   })
     })
   .catch((error) => {
      console.log(error);
   });

   //<|========================= Deleting Testimonial by its id {END}======================|>

}
//############################################################################################//
   //<|========================= Testimonial DELETE method code{END}  ======================|>
   //############################################################################################//