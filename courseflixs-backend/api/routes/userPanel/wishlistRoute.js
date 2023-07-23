const express = require("express");
const router = express.Router();
var { retreiveWishlist,addWishlist,deleteWishlist } = require('../../controllers/userPanel/endUserWishlistController');

router.get('/get-wishlist/:userID', retreiveWishlist);
router.post('/add-wishlist',addWishlist);
router.delete('/delete-wishlist/:wishID',deleteWishlist)

module.exports = router;
