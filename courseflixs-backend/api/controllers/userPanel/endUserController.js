const UserSchema = require('../../models/endUserSchema')
//############################################################################################//
//<|========================= User GET method code  ======================|>
//############################################################################################//
exports.retreiveUser = (req, res, next) => {
   //<|========================= Retreiving Single User Details Data ======================|>

    var userID=req.params.id;
    if(userID){
      console.log("Single data cat")
      UserSchema.findById(userID).then((data)=>{
         res.status(200).send(data);
         console.log(data)
        }).catch((error)=>{
         console.log(error);
        })
   //<|========================= Retreiving Single User Details Data{END} ======================|>

    }else{
   //<|========================= Retreiving Total User Details Data ======================|>

   UserSchema.find().then((data) => {
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
exports.addUser = (req, res, next) => {
   const { userName, email,password } = req.body;
   console.log(req.body)
   var insertUser = new UserSchema({
    name: userName.trim(),
    email: email.trim(),
    password: password.trim(),
   });
   console.log("request reached")

   insertUser.save().then(() => {
      return res.status(200).send({ userMsg: "User details Inserted Successfully!!!" });
   });
}
//<|========================= inserting User Data {END}======================|>

