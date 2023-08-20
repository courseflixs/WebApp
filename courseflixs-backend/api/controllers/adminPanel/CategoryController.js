const categorySchema = require('../../models/categorySchema')
//############################################################################################//
//<|========================= Category GET method code  ======================|>
//############################################################################################//
exports.retreiveCategory = (req, res, next) => {
   //<|========================= Retreiving Single Category Details Data ======================|>

    var catID=req.params.id;
    if(catID){
      console.log("Single data cat")
      categorySchema.findById(catID).then((data)=>{
         res.status(200).send(data);
         console.log(data)
        }).catch((error)=>{
         console.log(error);
        })
   //<|========================= Retreiving Single Category Details Data{END} ======================|>

    }else{
   //<|========================= Retreiving Total Category Details Data ======================|>

   categorySchema.find().then((data) => {
      res.status(200).send(data);
   }).catch((error) => {
      console.log(error)
   });
    }
   //<|========================= Retreiving Single Category Details Data{END} ======================|>
}

//<|========================= Retreive Category Data {END}======================|>



//############################################################################################//
//<|========================= Retreive type cat code  ======================|>
//############################################################################################//
exports.retreiveTypeCategory=(req,res,next)=>{
   var catType=req.params.typeCat;
   categorySchema.find({type_of_category:catType}).then((data)=>{
      res.status(200).send(data);
      console.log(data)
     }).catch((error)=>{
      console.log(error);
     })
}

//<|=========================  Retreive type cat code  {END}======================|>




//############################################################################################//
//<|========================= Category POST method code  ======================|>
//############################################################################################//
exports.addCategory = (req, res, next) => {
   const { categoryName, categoryType,qoute } = req.body;
   console.log(req.body)
   var insertCat = new categorySchema({
      type_of_category: categoryType.trim(),
      category_name: categoryName.trim(),
      qoute:qoute.trim()

   });
   console.log("request reached")

   insertCat.save().then(() => {
      return res.status(200).send({ catMsg: "Category details Inserted Successfully!!!" });
   });
}
//<|========================= inserting Category Data {END}======================|>

//############################################################################################//
//<|========================= Category PUT method code ======================|>
//############################################################################################//
exports.updatingCategory = (req, res, next) => {
   //<|========================= Updating particular Category by its id ======================|>
   console.log("updating project");
   const { categoryName, categoryType,qoute } = req.body;
   var id = req.params.id
   console.log(req.params);
   // console.log(req.body);

   var findingAndUpdatingCat = categorySchema.findOneAndUpdate({ _id: id }, {
      type_of_category: categoryType.trim(),
      category_name: categoryName.trim(),
      qoute:qoute.trim()
   });
   findingAndUpdatingCat.exec().then((singleData) => {
      console.log(singleData)
      res.status(200).send({ catMsg: "Category details Updated Successfully!!!" });
   }).catch((error) => {

   });

   //<|========================= Updating particular Category by its id {END}======================|>
}


//############################################################################################//
//<|========================= Category PUT method code{END} ======================|>
//############################################################################################//


//   /############################################################################################//
//<|========================= Category DELETE method code  ======================|>
//############################################################################################//
exports.deletingCategory = (req, res, next) => {
   //<|========================= Deleting Category by its id ======================|>

   var id = req.params.id;
   var findingAndDeletingCat = categorySchema.findOneAndDelete({ _id: id });
   findingAndDeletingCat.exec().then((deleteData) => {
      res.status(200).send({ catMsg: "Category details deleted Successfully!!!" });

   }).catch((error) => {
      console.log(error);
   });


   //<|========================= Deleting Category by its id {END}======================|>

}
//############################################################################################//
   //<|========================= Category DELETE method code{END}  ======================|>
   //############################################################################################//