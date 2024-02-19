const fs = require('fs');
const path = require('path');
const productSchema = require('../../models/productDetailsSchema');

// ############################################################################################//
// <|========================= Category GET method code  ======================|>
// ############################################################################################//
exports.retreiveProduct = (req, res, next) => {
  // <|========================= Retreiving Single Category Details Data ======================|>

  const proID = req.params.id;
  if (proID) {
    productSchema.findById(proID).then((data) => {
      // console.log(data);
      res.status(200).send(data);
    });

    // <|========================= Retreiving Single Category Details Data{END} ======================|>
  } else {
    // <|========================= Retreiving Total Category Details Data ======================|>

    productSchema.find().then((data) => {
      res.status(200).send(data);
    }).catch((error) => {
      console.log(error);
    });
  }
  // <|========================= Retreiving Single Category Details Data{END} ======================|>
};

// <|========================= Retreive Category Data {END}======================|>

// ############################################################################################//
// <|========================= Category POST method code  ======================|>
// ############################################################################################//
exports.addProduct = (req, res, next) => {
  const { proMainImg, gifImage } = req.files;
  console.log(proMainImg);
  const {
    proName, catName, proFileSize, proOriginalPrice, proSalePrice, selePageLink, salePage, sliderProVisiblity, recomProvisiblity, seoKeywordList,
  } = req.body;
  const insertPro = new productSchema({
    main_product_image: proMainImg[0].filename,
    product_name: proName.trim(),
    category_name: catName.trim(),
    file_size: proFileSize,
    original_price: parseInt(proOriginalPrice),
    sale_price: parseInt(proSalePrice),
    gif_image: gifImage[0].filename,
    sale_page: salePage,
    sale_page_link: selePageLink.trim(),
    tags: JSON.parse(seoKeywordList),
    show_slider: sliderProVisiblity,
    recommended: recomProvisiblity,

  });
  console.log('request reached');

  insertPro.save().then(() => res.status(200).send({ proMsg: 'Product details Inserted Successfully!!!' }));
};
// <|========================= inserting Category Data {END}======================|>

// ############################################################################################//
// <|========================= Category PUT method code ======================|>
// ############################################################################################//
exports.updatingProduct = (req, res, next) => {
  // <|========================= Updating particular Category by its id ======================|>

  console.log('updating project');
  const { proMainImg, gifImage } = req.files;
  const {
    updateMainImg, updateGifImg, proName, catName, proFileSize, proOriginalPrice, proSalePrice, selePageLink, salePage, sliderProVisiblity, recomProvisiblity, seoKeywordList,
  } = req.body;
  const { id } = req.params;
  // console.log(req.params);
  // console.log(req.body);
  // console.log(proMainImg)

  const findingAndUpdatingPro = productSchema.findOneAndUpdate({ _id: id }, {
    main_product_image: proMainImg ? proMainImg[0].filename : updateMainImg,
    product_name: proName.trim(),
    category_name: catName.trim(),
    file_size: proFileSize,
    original_price: parseInt(proOriginalPrice),
    sale_price: parseInt(proSalePrice),
    gif_image: gifImage ? gifImage[0].filename : updateGifImg,
    sale_page: salePage,
    sale_page_link: selePageLink.trim(),
    tags: JSON.parse(seoKeywordList),
    show_slider: sliderProVisiblity,
    recommended: recomProvisiblity,

  });
  findingAndUpdatingPro.exec().then((singleData) => {
    res.status(200).send({ proMsg: 'Product details Updated Successfully!!!' });
  }).catch((error) => {

  });

  // <|========================= Updating particular Category by its id {END}======================|>
};

// ############################################################################################//
// <|========================= Category PUT method code{END} ======================|>
// ############################################################################################//

//   /############################################################################################//
// <|========================= Category DELETE method code  ======================|>
// ############################################################################################//
exports.deletingProduct = (req, res, next) => {
  // <|========================= Deleting Category by its id ======================|>

  const { id } = req.params;
  productSchema.findById(id).then((data) => {
    const findingAndDeletingPro = productSchema.findOneAndDelete({ _id: id });
    findingAndDeletingPro.exec().then((deleteData) => {
      if(fs.existsSync(`./public/images/products/${data.main_product_image}`))
      fs.unlinkSync(`./public/images/products/${data.main_product_image}`);
      if(fs.existsSync(`./public/images/products/${data.gif_image}`))
      fs.unlinkSync(`./public/images/products/${data.gif_image}`);
      res.status(200).send({ proMsg: 'Product details deleted Successfully!!!' });
    });
  })
    .catch((error) => {
      console.log(error);
    });

  // <|========================= Deleting Category by its id {END}======================|>
};
// ############################################################################################//
// <|========================= Category DELETE method code{END}  ======================|>
// ############################################################################################//

//   /############################################################################################//
// <|========================= Lock and Unlock the Productcode  ======================|>
// ############################################################################################//
exports.updatingLockUnlockStatus = (req, res, next) => {
  const { id, lock_status } = req.params;
  const findingAndUpdatingProStatus = productSchema.findOneAndUpdate({ _id: id }, {
    lock_unlock_product: lock_status,

  });
  findingAndUpdatingProStatus.exec().then((singleData) => {
    res.status(200).send({ proMsg: 'Product Lock/Unlock Status Updated Successfully!!!' });
  }).catch((error) => {

  });
};

// ############################################################################################//
// <|========================= Lock and Unlock the Product{END}  ======================|>
// ############################################################################################//
