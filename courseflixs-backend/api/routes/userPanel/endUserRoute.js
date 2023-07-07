const express = require("express");
const router = express.Router();
var { addUser, retreiveUser } = require('../../controllers/userPanel/endUserController');

router.get('/get-user/:id?', retreiveUser);
router.post('/add-user', addUser);



module.exports = router;