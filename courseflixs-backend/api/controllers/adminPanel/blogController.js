const blogSchema = require('../../models/blogSchema')
const fs=require('fs')

//############################################################################################//
//<|========================= Blog GET method code  ======================|>
//############################################################################################//
exports.retreiveBlog = (req, res, next) => {
   //<|========================= Retreiving Single Blog Details Data ======================|>

    var blogID=req.params.id;
    if(blogID){
      console.log("Single data cat")
      blogSchema.findById(blogID).then((data)=>{
         res.status(200).send(data);
         // console.log(data)
        }).catch((error)=>{
         console.log(error);
        })
   //<|========================= Retreiving Single Blog Details Data{END} ======================|>

    }else{
   //<|========================= Retreiving Total Blog Details Data ======================|>

   blogSchema.find().then((data) => {
      res.status(200).send(data);
   }).catch((error) => {
      console.log(error)
   });
    }
   //<|========================= Retreiving Single Blog Details Data{END} ======================|>
}

//<|========================= Retreive Blog Data {END}======================|>


//############################################################################################//
//<|========================= Blog POST method code  ======================|>
//############################################################################################//
exports.addBlog = (req, res, next) => {
   const {blogVisiblity, blogName, blogCategory,blogDesc,blogTags } = req.body;
   const {blogImage}=req.files;
   var insertBlog = new blogSchema({
    blog_image:blogImage[0].filename,
    visiblity:blogVisiblity,
    blog_name:blogName.trim(),
    category:blogCategory.trim(),
    description:blogDesc,
    tags:JSON.parse(blogTags)

   });
   console.log("request reached")

   insertBlog.save().then(() => {
      return res.status(200).send({ blogMsg: "Blog details Inserted Successfully!!!" });
   });
}
//<|========================= inserting Blog Data {END}======================|>

//############################################################################################//
//<|========================= Blog PUT method code ======================|>
//############################################################################################//
exports.updatingBlog = (req, res, next) => {
   //<|========================= Updating particular Blog by its id ======================|>
   console.log("updating project");
   const {blogVisiblity, blogName, blogCategory,blogDesc,blogTags,updatedBlogImg } = req.body;
   const {blogImage}=req.files; 
     var id = req.params.id

   var findingAndUpdatingBlog = blogSchema.findOneAndUpdate({ _id: id }, {
    blog_image:blogImage?blogImage[0].filename:updatedBlogImg,
    visiblity:blogVisiblity,
    blog_name:blogName.trim(),
    category:blogCategory.trim(),
    description:blogDesc,
    tags:JSON.parse(blogTags)
   });
   findingAndUpdatingBlog.exec().then((singleData) => {
      // console.log(singleData)
      res.status(200).send({ blogMsg: "Blog details Updated Successfully!!!" });
   }).catch((error) => {

   });

   //<|========================= Updating particular Blog by its id {END}======================|>
}


//############################################################################################//
//<|========================= Blog PUT method code{END} ======================|>
//############################################################################################//


//   /############################################################################################//
//<|========================= Blog DELETE method code  ======================|>
//############################################################################################//
exports.deletingBlog = (req, res, next) => {
   //<|========================= Deleting Blog by its id ======================|>
   var id = req.params.id

   blogSchema.findById(id).then((data)=>{
      var findingAndDeletingPro = blogSchema.findOneAndDelete({ _id: id });
      findingAndDeletingPro.exec().then((deleteData) => { 
      fs.unlinkSync('./public/images/blogs/'+data.blog_image, (error) => {
        if (error) {
          console.log(error);
        }
      });
      res.status(200).send({ blogMsg: "Blog details deleted Successfully!!!" });   })
     })
   .catch((error) => {
      console.log(error);
   });

   //<|========================= Deleting Blog by its id {END}======================|>

}
//############################################################################################//
   //<|========================= Blog DELETE method code{END}  ======================|>
   //############################################################################################//

   exports.getAllPublicBlog=(req,res,next)=>{
      const{catOrVisiblity}=req.params;
      blogSchema.find({$or:[{visiblity:catOrVisiblity },{category:catOrVisiblity}]}).then((data)=>{
         res.status(200).send(data);
         // console.log(data)
        }).catch((error)=>{
         console.log(error);
        })
   }

   exports.getTopBlog=(req,res,next)=>{
      blogSchema.find({}).sort({ _id: -1 }).limit(5).exec().then((newBlogData) => {
         res.status(200).send(newBlogData);
     })

   }