const deliverySchema = require('../../models/deliveredOrderSchema');
const mongoose = require('mongoose')

//############################################################################################//
//<|========================= Delivery GET method code  ======================|>
//############################################################################################//
exports.retreiveDelivery = async (req, res, next) => {
   //<|========================= Retreiving Single Delivery Details Data ======================|>

   var deliveryID = req.params.id;
   if (deliveryID) {
      console.log("Single data cat")
      deliverySchema.findById(deliveryID).then((data) => {
         res.status(200).send(data);
         console.log(data)
      }).catch((error) => {
         console.log(error);
      })
      //<|========================= Retreiving Single Delivery Details Data{END} ======================|>

   } else {
      //<|========================= Retreiving Total Delivery Details Data ======================|>


      let args = {
         query: [
            {
               $lookup: {
                  from: "product_details",
                  localField: "product_id",
                  foreignField: "_id",
                  as: "ProductData"
               }
            },
            { $unwind: "$ProductData" },
            {
               $lookup: {
                  from: "end_users",
                  localField: "user_id",
                  foreignField: "_id",
                  as: "UserData"
               }
            },
            { $unwind: "$UserData" },

            //  {
            //      $project: {
            //       user_id:1,
            //        product_id:1,
            //        bargain_price:1,
            //        product_link:1,
            //        points:1,
            //        product_name:"$ProductData.product_name",
            //        category_name:"$ProductData.category_name",
            //        original_price:"$ProductData.original_price",
            //        sale_price:"$ProductData.sale_price",
            //        name:"$UserData.name",


            //      }
            //  }
         ],
      }
      await deliverySchema.aggregate(args.query)
         .then((data) => {
            if (data) {
               console.log(data);
               return res.status(200).send(data)
            }
            console.log("no record found")
            return res.status(200).send({ data: "data not found" })
         })
         .catch((error) => {
            console.log(error)
         })
   }
   //<|========================= Retreiving Single Delivery Details Data{END} ======================|>
}

//<|========================= Retreive Delivery Data {END}======================|>



//############################################################################################//
//<|========================= Delivery POST method code  ======================|>
//############################################################################################//
exports.addDelivery = (req, res, next) => {
   const { userID, productID, userName, productName, finalPrice, productLink, points } = req.body;
   var userMongooseId = new mongoose.Types.ObjectId(userID)
   var productMongooseId = new mongoose.Types.ObjectId(productID)
   console.log(req.body)
   console.log(userMongooseId)

   var insertDelivery = new deliverySchema({
      user_id: userMongooseId,
      product_id: productMongooseId,
      user_name: userName,
      product_name: productName,
      bargain_price: parseInt(finalPrice),
      product_link: productLink.trim(),
      points: parseInt(points),
   });
   console.log("request reached")

   insertDelivery.save().then(() => {
      return res.status(200).send({ deliverMsg: "Delivery details Inserted Successfully!!!" });
   });
}
//<|========================= inserting Delivery Data {END}======================|>

//############################################################################################//
//<|========================= Delivery PUT method code ======================|>
//############################################################################################//
exports.updatingDelivery = (req, res, next) => {
   //<|========================= Updating particular Delivery by its id ======================|>
   console.log("updating project");
   const { userID, productID, userName, productName, finalPrice, productLink, points } = req.body;
   var userMongooseId = userID ? new mongoose.Types.ObjectId(userID) : ''
   var productMongooseId = productID ? new mongoose.Types.ObjectId(productID) : ''
   var id = req.params.id
   console.log(req.params);
   // console.log(req.body);
   deliverySchema.findById(id).then((data) => {

      var findingAndUpdatingDelivery = deliverySchema.findOneAndUpdate({ _id: id }, {
         user_id: userID ? userMongooseId : data.user_id,
         product_id: productID ? productMongooseId : data.product_id,
         user_name: userName ? userName : data.user_name,
         product_name: productName ? productName : data.product_name,
         bargain_price: parseInt(finalPrice),
         product_link: productLink.trim(),
         points: parseInt(points)
      });
      findingAndUpdatingDelivery.exec().then((singleData) => {
         res.status(200).send({ deliverMsg: "Delivery details Updated Successfully!!!" });
      })
   }).catch((error) => {
      // if(error) throw error;
   }).catch((err) => {
      // if(err) throw err;
   });

   //<|========================= Updating particular Delivery by its id {END}======================|>
}


//############################################################################################//
//<|========================= Delivery PUT method code{END} ======================|>
//############################################################################################//


//   /############################################################################################//
//<|========================= Delivery DELETE method code  ======================|>
//############################################################################################//
exports.deletingDelivery = (req, res, next) => {
   //<|========================= Deleting Delivery by its id ======================|>

   var id = req.params.id;
   var findingAndDeletingDelivery = deliverySchema.findOneAndDelete({ _id: id });
   findingAndDeletingDelivery.exec().then((deleteData) => {
      res.status(200).send({ deliverMsg: "Delivery details deleted Successfully!!!" });

   }).catch((error) => {
      console.log(error);
   });


   //<|========================= Deleting Delivery by its id {END}======================|>

}
//############################################################################################//
   //<|========================= Delivery DELETE method code{END}  ======================|>
   //############################################################################################//


exports.getSpecificUserDelivery=async(req,res,next)=>{
   const { userID } = req.params;
   let matchObj = {};
   matchObj['user_id'] = new mongoose.Types.ObjectId(userID);

      let args = {
         query: [
            {
               $match: { ...matchObj }
            },
            {
               $lookup: {
                  from: "product_details",
                  localField: "product_id",
                  foreignField: "_id",
                  as: "ProductData"
               }
            },
            { $unwind: "$ProductData" },
            {
               $lookup: {
                  from: "end_users",
                  localField: "user_id",
                  foreignField: "_id",
                  as: "UserData"
               }
            },
            { $unwind: "$UserData" },

          
         ],
      }
      await deliverySchema.aggregate(args.query)
         .then((data) => {
            if (data) {
               console.log(data);
               return res.status(200).send(data)
            }
            console.log("no record found")
            return res.status(200).send({ data: "data not found" })
         })
         .catch((error) => {
            console.log(error)
         })
   }

