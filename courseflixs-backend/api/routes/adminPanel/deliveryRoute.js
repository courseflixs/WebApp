const express = require("express");
const router = express.Router();
var { addDelivery, retreiveDelivery, updatingDelivery, deletingDelivery } = require('../../controllers/adminPanel/deliveryController');

router.get('/get-delivery/:id?', retreiveDelivery);
router.post('/add-delivery', addDelivery);
router.put('/update-delivery/:id', updatingDelivery);
router.delete('/delete-delivery/:id', deletingDelivery);


module.exports = router;