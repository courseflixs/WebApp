const express = require('express');

const router = express.Router();
const {
  addUser, retreiveUser, getAllCustomer, forgotPassword, resetPassword, sendContactEmail,
} = require('../../controllers/userPanel/endUserController');
// Replace these configurations with your own SMTP settings

router.post('/get-user', retreiveUser);
router.post('/add-user', addUser);
router.get('/get-all-user', getAllCustomer);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/send-contact-email', sendContactEmail);

module.exports = router;
