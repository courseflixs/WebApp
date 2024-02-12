const express = require('express');

const router = express.Router();
const {
  addDelivery, retreiveDelivery, updatingDelivery, deletingDelivery, getSpecificUserDelivery,
} = require('../../controllers/adminPanel/deliveryController');

router.get('/get-delivery/:id?', retreiveDelivery);
router.post('/add-delivery', addDelivery);
router.put('/update-delivery/:id', updatingDelivery);
router.delete('/delete-delivery/:id', deletingDelivery);
router.get('/get-user-order/:userID', getSpecificUserDelivery);

module.exports = router;
