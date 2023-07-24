const express = require("express");
const router = express.Router();
var { addUser, retreiveUser,getAllCustomer,forgotPassword,resetPassword } = require('../../controllers/userPanel/endUserController');

router.post('/get-user', retreiveUser);
router.post('/add-user', addUser);
router.get('/get-all-user',getAllCustomer);
router.post('/forgot-password',forgotPassword)
router.post('/reset-password',resetPassword)

module.exports = router;