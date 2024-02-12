const mongoose = require('mongoose');
const wishlistSchema = require('../../models/wishlistSchema');
// ############################################################################################//
// <|========================= Wishlist GET method code  ======================|>
// ############################################################################################//
exports.retreiveWishlist = async (req, res, next) => {
  const { userID } = req.params;
  const matchObj = {};
  matchObj.userID = new mongoose.Types.ObjectId(userID);
  const args = {
    query: [
      {
        $match: { ...matchObj },
      },
      {
        $lookup: {
          from: 'product_details',
          localField: 'proID',
          foreignField: '_id',
          as: 'ProductData',
        },
      },
      { $unwind: '$ProductData' },

      {
        $project: {
          proID: 1,
          userID: 1,
          product_name: '$ProductData.product_name',
          category_name: '$ProductData.category_name',
          original_price: '$ProductData.original_price',
          sale_price: '$ProductData.sale_price',
          main_product_image: '$ProductData.main_product_image',
        },
      },
    ],
  };
  await wishlistSchema.aggregate(args.query)
    .then((data) => {
      if (data) {
        console.log(data);
        return res.status(200).send(data);
      }
      console.log('no record found');
      return res.status(200).send({ data: 'data not found' });
    })
    .catch((error) => {
      console.log(error);
    });
};
// <|========================= Retreive Wishlist Data {END}======================|>

// ############################################################################################//
// <|========================= Wishlist GET method code  ======================|>
// ############################################################################################//
exports.addWishlist = (req, res, next) => {
  const { userID, proID } = req.body;
  wishlistSchema.findOne({ $and: [{ userID }, { proID }] }).then((result) => {
    if (result) {
      return res.status(200).send({ wiMsg: 'Product already exist into the wishlist!' });
    }
    const insertWishlist = new wishlistSchema({
      proID: new mongoose.Types.ObjectId(proID),
      userID: new mongoose.Types.ObjectId(userID),
    });
    console.log('request reached');

    insertWishlist.save().then(() => res.status(200).send({ wishMsg: 'Product added into the wishlist!' }));
  });
};
// <|========================= Retreive Wishlist Data {END}======================|>

// ############################################################################################//
// <|========================= Wishlist GET method code  ======================|>
// ############################################################################################//
exports.deleteWishlist = (req, res, next) => {
  const { wishID } = req.params;
  const findingAndDeletingWishlist = wishlistSchema.findOneAndDelete({ _id: wishID });
  findingAndDeletingWishlist.exec().then((deleteData) => {
    res.status(200).send({ wishMsg: 'Product deleted from wishlist successfully!!!' });
  }).catch((error) => {
    console.log(error);
  });
};
// <|========================= Retreive Wishlist Data {END}======================|>
