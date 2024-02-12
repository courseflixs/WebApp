const productSchema = require('../../models/productDetailsSchema');
// ############################################################################################//
// <|========================= Product GET method code  ======================|>
// ############################################################################################//
exports.retreiveProducts = (req, res, next) => {
  const { typeOfPro } = req.params;
  if (typeOfPro == 'Recommended' || typeOfPro == 'Show') {
    productSchema.find({ $or: [{ recommended: typeOfPro }, { show_slider: typeOfPro }] }).then((data) => {
      // console.log(data);
      res.status(200).send(data);
    });
  } else if (typeOfPro == 'New') {
    productSchema.find({}).sort({ _id: -1 }).exec().then((newProData) => {
      res.status(200).send(newProData);
    });
  } else {
    // <|========================= Retreiving Total Product Details Data ======================|>

    productSchema.find().then((data) => {
      res.status(200).send(data);
    }).catch((error) => {
      console.log(error);
    });
  }
  // <|========================= Retreiving Single Product Details Data{END} ======================|>
};

// <|========================= Retreive Product Data {END}======================|>

exports.getSinglePro = (req, res, next) => {
  const { proID } = req.params;
  if (proID) {
    productSchema.findById(proID).then((data) => {
      // console.log(data);
      res.status(200).send(data);
    });
  }
};

exports.getCategoryWisePro = (req, res, next) => {
  const { category } = req.params;
  if (category) {
    productSchema.find({ category_name: category }).then((result) => {
      res.status(200).send(result);
    });
  }
};
