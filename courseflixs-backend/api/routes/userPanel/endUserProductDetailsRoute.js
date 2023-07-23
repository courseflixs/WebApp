const express = require("express");
const router = express.Router();
var { retreiveProducts,getSinglePro,getCategoryWisePro } = require('../../controllers/userPanel/userSideProductDetailsController');

router.get('/get-products/:typeOfPro?', retreiveProducts);

router.get('/get-singlepro/:proID',getSinglePro);
router.get('/get-cat-pro/:category',getCategoryWisePro)
module.exports = router;
