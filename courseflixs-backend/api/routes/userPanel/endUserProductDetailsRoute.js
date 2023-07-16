const express = require("express");
const router = express.Router();
var { retreiveProducts,getSinglePro } = require('../../controllers/userPanel/userSideProductDetailsController');

router.get('/get-products/:typeOfPro?', retreiveProducts);

router.get('/get-singlepro/:proID',getSinglePro)
module.exports = router;
