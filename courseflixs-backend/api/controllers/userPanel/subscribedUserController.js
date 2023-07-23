const subscribedUserSchema = require('../../models/subscribedUserSchema')
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
      return res.status(200).send({ userMsg: "Subscribed newsletter Successfully!!!" });
   });
}
//<|========================= inserting User Data {END}======================|>

