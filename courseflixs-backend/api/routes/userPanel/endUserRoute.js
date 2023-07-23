const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
var { addUser, retreiveUser,getAllCustomer,forgotPassword,resetPassword } = require('../../controllers/userPanel/endUserController');
// Replace these configurations with your own SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD
    }
  });
router.post('/get-user', retreiveUser);
router.post('/add-user', addUser);
router.get('/get-all-user',getAllCustomer);
router.post('/forgot-password',forgotPassword)
router.post('/reset-password',resetPassword)

module.exports = router;